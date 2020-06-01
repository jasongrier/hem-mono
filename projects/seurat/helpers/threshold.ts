export const threshold = (threshold: number, magnitude = 1) => {
  return threshold === 1 || Math.random() * magnitude < threshold
}
