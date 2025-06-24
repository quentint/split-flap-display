import {OutlineColor, outlineColorMap} from './colors.ts'
import {getRandomElement} from './random.ts'

const simpleConsonants = 'bdfjklmnprtvz'.toUpperCase().split('')
const hardConsonants = 'cghswx'.toUpperCase().split('')
const neverConsonants = 'q'.toUpperCase().split('')
const consonants = simpleConsonants.concat(hardConsonants, neverConsonants)
const vowels = 'aeiou'.toUpperCase().split('')

type Syllable = {
  text: string
  hard?: boolean
  color?: OutlineColor
}

export type SyllablePack = Syllable[]

export const characters = consonants
.concat(vowels, ' ', 'Y')
.sort((a: string, b: string) => {
  return a.localeCompare(b)
})

const makeHardSyllable = (): Syllable => {
  return {
    text: getRandomElement(hardConsonants) + getRandomElement(vowels),
    hard: true,
  }
}

const makeSimpleSyllable = (): Syllable => {
  return {
    text: getRandomElement(simpleConsonants) + getRandomElement(vowels),
    hard: false,
  }
}

export const makeSyllable = (hard: boolean = false): Syllable => {
  return hard ? makeHardSyllable() : makeSimpleSyllable()
}

const applyRandomColors = (pack: SyllablePack): void => {
  const colors: OutlineColor[] = Object.keys(outlineColorMap) as OutlineColor[]
  const randomColorIndex = Math.floor(Math.random() * colors.length)
  const numSyllables = pack.length
  const colorGap = Math.floor(colors.length / numSyllables)

  pack.forEach((s: Syllable, index: number) => {
    s.color = colors[(randomColorIndex + (index * colorGap)) % colors.length]
  })
}

export const makeSyllablePack = (count: number, hard: boolean = false): SyllablePack => {
  let syllablePack: SyllablePack = []
  for (let i = 0; i < count; i++) {
    syllablePack.push(makeSyllable(hard))
  }

  applyRandomColors(syllablePack)

  return syllablePack
}