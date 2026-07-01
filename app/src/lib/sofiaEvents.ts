// Lets other components (e.g. the Educate Yourself panel) open Sofia's
// chat widget without needing shared state — ChatWidget listens for this.
export const OPEN_SOFIA_EVENT = 'steadfast:open-sofia'

// ChatWidget dispatches this whenever its own open/closed state changes, so
// other floating UI (e.g. the Educate Yourself panel) can react — for
// instance, shifting itself aside so the two never overlap.
export const SOFIA_OPEN_CHANGED_EVENT = 'steadfast:sofia-open-changed'

export function openSofiaChat() {
  window.dispatchEvent(new CustomEvent(OPEN_SOFIA_EVENT))
}

export function notifySofiaOpenChanged(open: boolean) {
  window.dispatchEvent(new CustomEvent<{ open: boolean }>(SOFIA_OPEN_CHANGED_EVENT, { detail: { open } }))
}
