const simpleConsonants = 'bdfjklmnprtvz'.toUpperCase().split('');
const hardConsonants = 'cghqsvwx'.toUpperCase().split('');
const consonants = simpleConsonants.concat(hardConsonants);
const vowels = 'aeiouy'.toUpperCase().split('');

export const characters = consonants.concat(vowels, ' ').sort((a: string, b: string) => {
  return a.localeCompare(b);
})

const getRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const makeSimpleSyllable = (): string => {
  return getRandomElement(simpleConsonants) + getRandomElement(vowels);
}

