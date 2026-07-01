// Parses resource-docs/top-100-us-university-application-answers.md into
// app/src/data/faq-guide.json for the narrated "Educate Yourself" panel.
// Re-run this (`node scripts/build-faq-guide.mjs`) whenever the source doc changes.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '../resource-docs/top-100-us-university-application-answers.md')
const OUT = join(__dirname, '../app/src/data/faq-guide.json')

const raw = readFileSync(SRC, 'utf8')

function toSpeech(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/^[-*]\s{1,4}/gm, '')
    .replace(/^\d+\.\s{1,4}/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toDisplay(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s*/gm, '')
    .replace(/^[-*]\s{1,4}/gm, '')
    .replace(/^\d+\.\s{1,4}/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toLines(body) {
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  const lines = []
  for (const block of blocks) {
    const isList = /^([-*]\s|\d+\.\s)/.test(block)
    if (isList) {
      const items = block.split('\n').map((l) => l.trim()).filter(Boolean)
      for (const item of items) lines.push({ display: toDisplay(item), speech: toSpeech(item) })
    } else {
      lines.push({ display: toDisplay(block), speech: toSpeech(block) })
    }
  }
  return lines
}

const lines = raw.split('\n')
const guide = { intro: null, chapters: [], outro: null }
let mode = 'intro' // 'intro' | 'chapter' | 'outro'
let currentChapter = null
let currentQuestion = null
let buffer = []
let outroBuffer = []

function flushBuffer() {
  const text = buffer.join('\n')
  if (currentQuestion) {
    currentQuestion.lines = toLines(text)
    currentChapter.questions.push(currentQuestion)
    currentQuestion = null
  } else if (mode === 'intro' && guide.intro === null && buffer.some((l) => l.trim())) {
    guide.intro = { lines: toLines(text) }
  }
  buffer = []
}

for (const line of lines) {
  const chapterMatch = line.match(/^##\s+(Part .+)/)
  const questionMatch = line.match(/^###\s+(\d+)\.\s+(.+)/)
  const isH1 = /^#\s+/.test(line)
  const isDivider = /^---\s*$/.test(line)
  const isAboutHeading = /^##\s+About This Guide/.test(line)
  const isOutroHeading = /^##\s+You've Reached the End/.test(line)

  if (isH1 || isAboutHeading) continue // skip, keep accumulating intro buffer

  if (isOutroHeading) {
    flushBuffer()
    mode = 'outro'
    continue
  }

  if (mode === 'outro') {
    if (!isDivider) outroBuffer.push(line) // dividers inside outro are just separators, not content
    continue
  }

  if (chapterMatch) {
    flushBuffer()
    mode = 'chapter'
    currentChapter = { title: chapterMatch[1].trim(), questions: [] }
    guide.chapters.push(currentChapter)
    continue
  }
  if (questionMatch) {
    flushBuffer()
    currentQuestion = { id: Number(questionMatch[1]), question: questionMatch[2].trim(), lines: [] }
    continue
  }
  if (isDivider) {
    if (currentQuestion) flushBuffer()
    continue
  }
  buffer.push(line)
}
flushBuffer()
if (outroBuffer.some((l) => l.trim())) {
  guide.outro = { lines: toLines(outroBuffer.join('\n')) }
}

const totalQuestions = guide.chapters.reduce((n, c) => n + c.questions.length, 0)
writeFileSync(OUT, JSON.stringify(guide, null, 2))
console.log(`Wrote ${OUT}`)
console.log(`Intro lines: ${guide.intro ? guide.intro.lines.length : 0}`)
console.log(`Outro lines: ${guide.outro ? guide.outro.lines.length : 0}`)
console.log(`Chapters: ${guide.chapters.length}, Questions: ${totalQuestions}`)
