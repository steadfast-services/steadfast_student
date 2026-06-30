'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, CheckCircle, Calendar } from 'lucide-react'
import Link from 'next/link'
import type { ChatMessage } from '@/lib/types'

const GREETING: ChatMessage = {
  role: 'model',
  content: "Hi! I'm Sofia, your Steadfast enrollment advisor. I'm here 24 hours a day, 7 days a week.\n\nTo help you best — what country are you from, and what would you like to study in the U.S.?",
  timestamp: Date.now(),
}

const QUICK_PROMPTS = [
  'I am from Nigeria',
  'I was denied before',
  'What do I need for a visa?',
  'How much does it cost?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-open after 45 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('chat-opened')) {
        setOpen(true)
        setUnread(0)
        sessionStorage.setItem('chat-opened', '1')
      }
    }, 45000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text?: string) {
    const content = text ?? input.trim()
    if (!content || loading) return
    setInput('')
    const userMsg: ChatMessage = { role: 'user', content, timestamp: Date.now() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'model', content: data.reply, timestamp: Date.now() }])
      if (data.leadCaptured) setLeadCaptured(true)
    } catch {
      setMessages((prev) => [...prev, {
        role: 'model',
        content: "Sorry, I am having a connection problem. Please email us directly at advisors@steadfaststudentservices.com and we will reply within 24 hours.",
        timestamp: Date.now(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal text-white rounded-full shadow-xl flex items-center justify-center hover:bg-teal-light transition-all duration-200 hover:scale-110"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">{unread}</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col chat-enter overflow-hidden" style={{ maxHeight: '560px' }}>
          {/* Header */}
          <div className="bg-navy px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-teal rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Sofia — Enrollment Advisor</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-white/50 text-xs">Online 24/7 · English &amp; Translation Friendly</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/50 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Lead captured banner */}
          {leadCaptured && (
            <div className="bg-green-50 border-b border-green-200 px-4 py-3 flex-shrink-0">
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 text-xs font-semibold">Your details have been sent to an advisor!</p>
                  <p className="text-green-700 text-xs mt-0.5">You will hear from us within 24 hours. Or book your free call right now:</p>
                </div>
              </div>
              <Link
                href="/book"
                className="mt-2 flex items-center justify-center gap-2 bg-teal text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-navy transition-colors"
              >
                <Calendar size={13} /> Book Free 30-Min Call Now
              </Link>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${msg.role === 'model' ? 'chat-bubble-bot' : 'chat-bubble-user'} whitespace-pre-line`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot flex items-center gap-1.5">
                  <Loader2 size={13} className="animate-spin text-teal" />
                  <span className="text-xs text-gray-500">Sofia is typing…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-2 bg-gray-50 flex-shrink-0">
              {QUICK_PROMPTS.map((p) => (
                <button key={p} onClick={() => sendMessage(p)}
                  className="text-xs bg-white border border-gray-200 text-navy px-3 py-1.5 rounded-full hover:bg-teal hover:text-white hover:border-teal transition-colors"
                >{p}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question…"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-white disabled:opacity-40 hover:bg-teal-light transition-colors flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
