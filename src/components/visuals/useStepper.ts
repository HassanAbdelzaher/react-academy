import { useEffect, useState } from 'react'

/** Step state shared by every animated diagram, with optional auto-play. */
export function useStepper(count: number, autoMs = 2600) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), autoMs)
    return () => window.clearInterval(id)
  }, [playing, count, autoMs])

  return {
    step,
    playing,
    setStep,
    togglePlay: () => setPlaying((p) => !p),
    next: () => setStep((s) => (s + 1) % count),
    prev: () => setStep((s) => (s - 1 + count) % count),
  }
}
