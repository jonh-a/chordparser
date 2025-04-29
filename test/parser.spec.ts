import { getChordNotesByName } from '../src/parser'

test("test C major triad", () => {
  expect(getChordNotesByName({name: "C"})).toEqual(["C", "E", "G"])
})

test("test C major triad with G bass note", () => {
  expect(getChordNotesByName({name: "C/G"})).toEqual(["G", "C", "E", "G"])
})