import { Chord } from "../src/chord";

test('chord inversions', () => {
  expect(new Chord({
    notes: ['C', 'E', 'G', 'B'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: null,
    chordType: 'maj7',
    rootNote: 'C',
  }).invert(1))
  .toEqual(new Chord({
    notes: ['E', 'G', 'B', 'C'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: 1,
    chordType: 'maj7',
    rootNote: 'C',
  }));

  expect(new Chord({
    notes: ['C', 'E', 'G', 'B'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: null,
    chordType: 'maj7',
    rootNote: 'C',
  }).invert(1).invert(1))
  .toEqual(new Chord({
    notes: ['E', 'G', 'B', 'C'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: 1,
    chordType: 'maj7',
    rootNote: 'C',
  }));
})