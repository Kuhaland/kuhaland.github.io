export function toSentences(text) {
  if (!text) return []

  const source = String(text)
  const lines = []
  let buffer = ''

  for (let i = 0; i < source.length; i++) {
    const char = source[i]
    buffer += char
    if (char !== '.') continue

    const next = source[i + 1]
    const isBoundary =
      next === undefined || /\s/.test(next) || /[가-힣]/.test(next)
    if (!isBoundary) continue

    lines.push(buffer.trim())
    buffer = ''
  }

  if (buffer.trim()) lines.push(buffer.trim())

  return lines.filter(Boolean)
}
