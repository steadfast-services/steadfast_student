import raw from '@/data/faq-guide.json'

export type FaqLine = { display: string; speech: string }

export type FaqSegment = {
  kind: 'intro' | 'chapter' | 'question' | 'outro'
  eyebrow: string
  title: string
  lines: FaqLine[]
  questionNumber?: number
}

type FaqGuideJson = {
  intro: { lines: FaqLine[] } | null
  chapters: { title: string; questions: { id: number; question: string; lines: FaqLine[] }[] }[]
  outro: { lines: FaqLine[] } | null
}

const data = raw as FaqGuideJson

function buildPlaylist(): FaqSegment[] {
  const segments: FaqSegment[] = []

  if (data.intro) {
    segments.push({ kind: 'intro', eyebrow: 'Welcome', title: 'About This Guide', lines: data.intro.lines })
  }

  for (const chapter of data.chapters) {
    segments.push({
      kind: 'chapter',
      eyebrow: 'Next Chapter',
      title: chapter.title,
      lines: [{ display: chapter.title, speech: chapter.title }],
    })
    for (const q of chapter.questions) {
      segments.push({
        kind: 'question',
        eyebrow: chapter.title,
        title: q.question,
        lines: q.lines,
        questionNumber: q.id,
      })
    }
  }

  if (data.outro) {
    segments.push({ kind: 'outro', eyebrow: "You've Reached the End", title: 'What Happens Next', lines: data.outro.lines })
  }

  return segments
}

export const FAQ_PLAYLIST: FaqSegment[] = buildPlaylist()
export const TOTAL_QUESTIONS = FAQ_PLAYLIST.filter((s) => s.kind === 'question').length
