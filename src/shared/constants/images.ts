const SOURCE_IMAGES: string[] = [
  '/images/2026-03-06 00.56.08.jpg',
  '/images/2026-03-06 00.57.24.jpg',
  '/images/2026-03-06 00.56.39.jpg',
  '/images/2026-03-06 00.56.43.jpg',
  '/images/2026-03-06 00.56.46.jpg',
  '/images/2026-03-06 00.57.03.jpg',
  '/images/2026-03-06 00.57.06.jpg',
  '/images/2026-03-06 00.57.10.jpg',
  '/images/2026-03-06 00.57.13.jpg',
  '/images/2026-03-06 00.57.16.jpg',
  '/images/2026-03-06 00.57.18.jpg',
  '/images/2026-03-06 00.57.21.jpg',
  '/images/2026-03-06 00.57.27.jpg',
  '/images/2026-03-06 00.57.29.jpg',
]

const shuffle = <T,>(items: readonly T[]): T[] => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const IMAGES: string[] = shuffle(SOURCE_IMAGES)
