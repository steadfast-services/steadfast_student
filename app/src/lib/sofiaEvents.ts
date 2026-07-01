// Lets other components (e.g. the Educate Yourself panel) open Sofia's
// chat widget without needing shared state — ChatWidget listens for this.
export const OPEN_SOFIA_EVENT = 'steadfast:open-sofia'

export function openSofiaChat() {
  window.dispatchEvent(new CustomEvent(OPEN_SOFIA_EVENT))
}
