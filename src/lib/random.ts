export const getRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)]
}