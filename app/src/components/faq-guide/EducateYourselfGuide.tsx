'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Headphones, X, Play, Pause, SkipBack, SkipForward, MessageCircle, ArrowRight } from 'lucide-react'
import { FAQ_PLAYLIST, TOTAL_QUESTIONS, type FaqSegment } from '@/lib/faqGuidePlaylist'
import { openSofiaChat, SOFIA_OPEN_CHANGED_EVENT } from '@/lib/sofiaEvents'

// Best-effort match for a female-sounding English voice — availability varies
// by OS/browser, so this degrades gracefully to the system default voice.
const FEMALE_VOICE_HINTS = [
  'female', 'zira', 'samantha', 'victoria', 'susan', 'karen', 'moira',
  'tessa', 'fiona', 'aria', 'jenny', 'hazel', 'catherine', 'linda', 'eva',
]

function findFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  return english.find((v) => FEMALE_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint))) ?? null
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-navy">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    return <span key={i}>{part}</span>
  })
}

export default function EducateYourselfGuide() {
  const [open, setOpen] = useState(false)
  const [segIndex, setSegIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [sofiaOpen, setSofiaOpen] = useState(false)

  const segIndexRef = useRef(0)
  const lineIndexRef = useRef(0)
  const pausingRef = useRef(false)
  const fallbackTimerRef = useRef<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const femaleVoiceRef = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
    setSpeechSupported(supported)
    if (!supported) return
    const loadVoice = () => { femaleVoiceRef.current = findFemaleVoice() }
    loadVoice()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoice)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoice)
  }, [])

  // Shift aside when Sofia's chat widget opens so the two never overlap.
  useEffect(() => {
    const handler = (e: Event) => setSofiaOpen((e as CustomEvent<{ open: boolean }>).detail.open)
    window.addEventListener(SOFIA_OPEN_CHANGED_EVENT, handler)
    return () => window.removeEventListener(SOFIA_OPEN_CHANGED_EVENT, handler)
  }, [])

  function clearFallbackTimer() {
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
  }

  function advance() {
    const seg = FAQ_PLAYLIST[segIndexRef.current]
    if (lineIndexRef.current + 1 < seg.lines.length) {
      const next = lineIndexRef.current + 1
      lineIndexRef.current = next
      setLineIndex(next)
      speakLine(seg.lines[next].speech)
    } else if (segIndexRef.current + 1 < FAQ_PLAYLIST.length) {
      const nextSeg = segIndexRef.current + 1
      segIndexRef.current = nextSeg
      lineIndexRef.current = 0
      setSegIndex(nextSeg)
      setLineIndex(0)
      speakSegmentStart(FAQ_PLAYLIST[nextSeg])
    } else {
      setPlaying(false)
      setFinished(true)
    }
  }

  // Deliberately does NOT call speechSynthesis.cancel() here — this is only
  // ever called once the previous utterance has already finished (or after an
  // explicit pause()/skip() already cancelled), so speak() just queues
  // normally. Calling cancel() immediately before speak() from inside another
  // utterance's own onend handler is a known Chrome race that silently drops
  // the new utterance — that's what broke question narration previously.
  function speakLine(text: string) {
    if (!speechSupported) {
      const words = text.split(/\s+/).length
      const ms = Math.max(1200, (words / 2.3) * 1000)
      fallbackTimerRef.current = window.setTimeout(() => {
        if (!pausingRef.current) advance()
      }, ms)
      return
    }
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.95
    utter.lang = 'en-US'
    utter.onend = () => { if (!pausingRef.current) advance() }
    utter.onerror = (e) => {
      console.error('Educate Yourself guide: speech error on answer line', e.error)
      if (!pausingRef.current) advance()
    }
    window.speechSynthesis.speak(utter)
  }

  // One-off utterance (not part of the answer-line auto-advance chain) — used
  // to announce the question itself in a distinct, female-matched voice.
  function speakText(text: string, onEnd: () => void) {
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.92
    utter.pitch = 1.15
    if (femaleVoiceRef.current) {
      utter.voice = femaleVoiceRef.current
      utter.lang = femaleVoiceRef.current.lang
    } else {
      utter.lang = 'en-US'
    }
    utter.onend = () => { if (!pausingRef.current) onEnd() }
    utter.onerror = (e) => {
      console.error('Educate Yourself guide: speech error on question header', e.error)
      if (!pausingRef.current) onEnd()
    }
    window.speechSynthesis.speak(utter)
  }

  // Entry point for beginning a segment fresh: narrates the question header
  // (female-matched voice) before handing off to the normal answer narration.
  function speakSegmentStart(seg: FaqSegment) {
    if (seg.kind === 'question' && speechSupported) {
      speakText(seg.title, () => speakLine(seg.lines[0].speech))
    } else {
      speakLine(seg.lines[0].speech)
    }
  }

  function pause() {
    pausingRef.current = true
    clearFallbackTimer()
    if (speechSupported) window.speechSynthesis.cancel()
    setPlaying(false)
  }

  function play() {
    if (finished) {
      segIndexRef.current = 0
      lineIndexRef.current = 0
      setSegIndex(0)
      setLineIndex(0)
      setFinished(false)
      pausingRef.current = false
      setPlaying(true)
      speakSegmentStart(FAQ_PLAYLIST[0])
      return
    }
    // Plain resume from pause — continue the current line, don't re-announce the question.
    pausingRef.current = false
    setPlaying(true)
    const seg = FAQ_PLAYLIST[segIndexRef.current]
    speakLine(seg.lines[lineIndexRef.current].speech)
  }

  function skip(direction: 1 | -1) {
    pause()
    const newSeg = Math.min(Math.max(segIndexRef.current + direction, 0), FAQ_PLAYLIST.length - 1)
    segIndexRef.current = newSeg
    lineIndexRef.current = 0
    setSegIndex(newSeg)
    setLineIndex(0)
    setFinished(false)
    pausingRef.current = false
    setPlaying(true)
    speakSegmentStart(FAQ_PLAYLIST[newSeg])
  }

  function pauseAndAskSofia() {
    pause()
    openSofiaChat()
  }

  function handleClose() {
    pause()
    setOpen(false)
  }

  // Start playing from the top each time the panel opens; stop cleanly on close/unmount.
  useEffect(() => {
    if (!open) return
    segIndexRef.current = 0
    lineIndexRef.current = 0
    setSegIndex(0)
    setLineIndex(0)
    setFinished(false)
    pausingRef.current = false
    setPlaying(true)
    speakSegmentStart(FAQ_PLAYLIST[0])
    return () => {
      pausingRef.current = true
      clearFallbackTimer()
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [segIndex, lineIndex, finished])

  const segment = FAQ_PLAYLIST[segIndex]
  const revealedLines = segment.lines.slice(0, lineIndex + 1)
  const progressPct = Math.round((segIndex / (FAQ_PLAYLIST.length - 1)) * 100)
  const eyebrowLabel =
    segment.kind === 'question'
      ? `${segment.eyebrow.replace(/^Part [A-Za-z]+:\s*/, '')} · Question ${segment.questionNumber} of ${TOTAL_QUESTIONS}`
      : segment.kind === 'intro'
        ? 'Welcome'
        : segment.kind === 'outro'
          ? "You've Reached the End"
          : segment.eyebrow

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
      >
        <Headphones size={18} /> Educate Yourself With Important Facts
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: sofiaOpen ? -140 : 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-navy px-5 py-4 flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Headphones size={18} className="text-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">Steadfast Guide — Educate Yourself</div>
                  <div className="text-white/50 text-xs truncate">{eyebrowLabel}</div>
                </div>
                <button onClick={handleClose} className="text-white/60 hover:text-white flex-shrink-0" aria-label="Close guide">
                  <X size={20} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-gray-100 flex-shrink-0">
                <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progressPct}%` }} />
              </div>

              {/* Sofia note */}
              <div className="bg-teal/10 border-b border-teal/20 px-5 py-3 flex items-center gap-3 flex-shrink-0">
                <MessageCircle className="text-teal flex-shrink-0" size={18} />
                <p className="text-xs text-navy/80 flex-1 leading-snug">
                  Want a detailed answer on <em>any</em> question? Pause this guide and ask Sofia directly for help specific to your situation.
                </p>
                <button
                  onClick={pauseAndAskSofia}
                  className="text-xs font-semibold text-teal border border-teal rounded-full px-3 py-1.5 hover:bg-teal hover:text-white transition-colors flex-shrink-0 whitespace-nowrap"
                >
                  Ask Sofia
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50">
                {segment.kind === 'chapter' ? (
                  <div className="text-center py-10">
                    <div className="section-label">{segment.eyebrow}</div>
                    <h3 className="font-display text-2xl font-bold text-navy mt-2">{segment.title}</h3>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="section-label">{eyebrowLabel}</div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-navy mt-1">{segment.title}</h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {revealedLines.map((line, i) => (
                        <motion.p
                          key={`${segIndex}-${i}`}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                          className="text-gray-700 text-[15px] leading-relaxed"
                        >
                          {renderInline(line.display)}
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </>
                )}

                {finished && (
                  <div className="text-center pt-6 pb-2 space-y-4">
                    <p className="text-gray-500 text-sm">You have reached the end of the guide.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/book" onClick={handleClose} className="btn-primary justify-center">
                        Book Your Free Consultation <ArrowRight size={16} />
                      </Link>
                      <button onClick={pauseAndAskSofia} className="btn-outline justify-center">
                        Ask Sofia a Question
                      </button>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Controls */}
              <div className="border-t border-gray-100 px-5 py-4 flex flex-col items-center gap-1.5 flex-shrink-0 bg-white">
                <div className="flex items-center justify-center gap-6">
                  <button onClick={() => skip(-1)} disabled={segIndex === 0} className="text-navy/60 hover:text-navy disabled:opacity-30" aria-label="Previous">
                    <SkipBack size={20} />
                  </button>
                  <button
                    onClick={() => (playing ? pause() : play())}
                    className="w-14 h-14 rounded-full bg-teal text-white flex items-center justify-center hover:bg-navy transition-colors"
                    aria-label={playing ? 'Pause' : 'Play'}
                  >
                    {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
                  </button>
                  <button onClick={() => skip(1)} disabled={segIndex === FAQ_PLAYLIST.length - 1} className="text-navy/60 hover:text-navy disabled:opacity-30" aria-label="Next">
                    <SkipForward size={20} />
                  </button>
                </div>
                {!speechSupported && (
                  <p className="text-[11px] text-gray-400 text-center">
                    Audio narration is not supported in this browser — the text will still display and advance automatically.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
