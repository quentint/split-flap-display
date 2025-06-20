const simpleConsonants = 'bdfjklmnprtvz'.toUpperCase().split('')
const hardConsonants = 'cghswx'.toUpperCase().split('')
const neverConsonants = 'q'.toUpperCase().split('')
const consonants = simpleConsonants.concat(hardConsonants, neverConsonants)
const vowels = 'aeiou'.toUpperCase().split('')

export const characters = consonants
.concat(vowels, ' ', 'Y')
.sort((a: string, b: string) => {
  return a.localeCompare(b)
})

const getRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const makeHardSyllable = (): string => {
  return getRandomElement(hardConsonants) + getRandomElement(vowels)
}

const makeSimpleSyllable = (): string => {
  return getRandomElement(simpleConsonants) + getRandomElement(vowels)
}

export const makeSyllable = (hard: boolean = false): string => {
  return hard ? makeHardSyllable() : makeSimpleSyllable()
}

export const makeSyllablePack = (count: number, hard: boolean = false): string => {
  let syllablePack = ''
  for (let i = 0; i < count; i++) {
    syllablePack += makeSyllable(hard)
  }
  return syllablePack
}