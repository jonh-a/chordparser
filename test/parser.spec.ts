import { getChordNotesByName } from '../src/parser'

test('test major triads', () => {
  expect(getChordNotesByName({ name: 'C' })).toEqual(['C', 'E', 'G'])
  expect(getChordNotesByName({ name: 'D#m7' })).toEqual(['D#', 'F#', 'A#', 'C#'])
  expect(getChordNotesByName({ name: 'Cm7' })).toEqual(['C', 'D#', 'G', 'A#'])
})

test('test triads with bass notes', () => {
  expect(getChordNotesByName({ name: 'C/G' })).toEqual(['G', 'C', 'E', 'G'])
  expect(getChordNotesByName({ name: 'D#m7/F#' })).toEqual(['F#', 'D#', 'F#', 'A#', 'C#'])
  expect(getChordNotesByName({ name: 'Cm7/G' })).toEqual(['G', 'C', 'D#', 'G', 'A#'])
})

test('test inversions', () => {
  expect(getChordNotesByName({ name: 'C', inversion: 1 })).toEqual(['E', 'G', 'C'])
  expect(getChordNotesByName({ name: 'C/G', inversion: 1 })).toEqual(['G', 'E', 'G', 'C'])
  expect(getChordNotesByName({ name: 'C', inversion: 2 })).toEqual(['G', 'C', 'E'])
  expect(getChordNotesByName({ name: 'C/G', inversion: 2 })).toEqual(['G', 'G', 'C', 'E'])
})