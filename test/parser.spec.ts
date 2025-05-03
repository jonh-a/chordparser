import { getChordByName, getChordByNotes } from '../src/parser';
import { Chord } from '../src/chord';

test('test basic string input', () => {
  expect(getChordByName('Cmaj7')).toEqual(
    new Chord({
      notes: ['C', 'E', 'G', 'B'],
      name: 'Cmaj7',
      bassNote: null,
      inversion: null,
      chordType: 'maj7',
      rootNote: 'C',
    }),
  );

  expect(getChordByName('Db7')).toEqual(
    new Chord({
      notes: ['Db', 'F', 'Ab', 'B'],
      name: 'Db7',
      bassNote: null,
      inversion: null,
      chordType: '7',
      rootNote: 'Db',
    }),
  );
});

test('test major triads', () => {
  expect(getChordByName({ name: 'C' })).toEqual(
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordByName({ name: 'D#m7' })).toEqual(
    new Chord({
      notes: ['D#', 'F#', 'A#', 'C#'],
      name: 'D#m7',
      bassNote: null,
      inversion: null,
      rootNote: 'D#',
      chordType: 'm7',
    }),
  );
  expect(getChordByName({ name: 'Db7' })).toEqual(
    new Chord({
      notes: ['Db', 'F', 'Ab', 'B'],
      name: 'Db7',
      bassNote: null,
      inversion: null,
      rootNote: 'Db',
      chordType: '7',
    }),
  );
  expect(getChordByName({ name: 'Cm7' })).toEqual(
    new Chord({
      notes: ['C', 'Eb', 'G', 'Bb'],
      name: 'Cm7',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: 'm7',
    }),
  );
  expect(getChordByName({ name: 'C6/9' })).toEqual(
    new Chord({
      notes: ['C', 'E', 'G', 'A', 'D'],
      name: 'C6/9',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: '6/9',
    }),
  );
});

test('test triads with bass notes', () => {
  expect(getChordByName({ name: 'C/G' })).toEqual(
    new Chord({
      notes: ['G', 'C', 'E', 'G'],
      name: 'C',
      bassNote: 'G',
      inversion: null,
      chordType: '',
      rootNote: 'C',
    }),
  );
  expect(getChordByName({ name: 'D#m7/F#' })).toEqual(
    new Chord({
      notes: ['F#', 'D#', 'F#', 'A#', 'C#'],
      name: 'D#m7',
      bassNote: 'F#',
      inversion: null,
      rootNote: 'D#',
      chordType: 'm7',
    }),
  );
  expect(getChordByName({ name: 'Cm7/G' })).toEqual(
    new Chord({
      notes: ['G', 'C', 'Eb', 'G', 'Bb'],
      name: 'Cm7',
      bassNote: 'G',
      inversion: null,
      chordType: 'm7',
      rootNote: 'C',
    }),
  );
  expect(getChordByName({ name: 'C6/9/G' })).toEqual(
    new Chord({
      notes: ['G', 'C', 'E', 'G', 'A', 'D'],
      name: 'C6/9',
      bassNote: 'G',
      inversion: null,
      rootNote: 'C',
      chordType: '6/9',
    }),
  );
  expect(getChordByName({ name: 'Db7/Ab' })).toEqual(
    new Chord({
      notes: ['Ab', 'Db', 'F', 'Ab', 'B'],
      name: 'Db7',
      bassNote: 'Ab',
      inversion: null,
      rootNote: 'Db',
      chordType: '7',
    }),
  );
});

test('test inversions', () => {
  expect(getChordByName({ name: 'C', inversion: 1 })).toEqual(
    new Chord({
      notes: ['E', 'G', 'C'],
      name: 'C',
      bassNote: null,
      inversion: 1,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordByName({ name: 'C/G', inversion: 1 })).toEqual(
    new Chord({
      notes: ['G', 'E', 'G', 'C'],
      name: 'C',
      bassNote: 'G',
      inversion: 1,
      chordType: '',
      rootNote: 'C',
    }),
  );
  expect(getChordByName({ name: 'C', inversion: 2 })).toEqual(
    new Chord({
      notes: ['G', 'C', 'E'],
      name: 'C',
      bassNote: null,
      inversion: 2,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordByName({ name: 'C/G', inversion: 2 })).toEqual(
    new Chord({
      notes: ['G', 'G', 'C', 'E'],
      name: 'C',
      bassNote: 'G',
      inversion: 2,
      rootNote: 'C',
      chordType: '',
    }),
  );
});

test('test parsing name from notes', () => {
  expect(getChordByNotes(['C', 'E', 'G']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByNotes(['G', 'C', 'E']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByNotes(['G', 'G', 'C', 'E']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByNotes(['G', 'B', 'C', 'E']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G', 'B'],
      name: 'Cmaj7',
      chordType: 'maj7',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByNotes(['G', 'Bb', 'Eb', 'F']).exactMatches).toEqual([
    new Chord({
      notes: ['D#', 'G', 'A#', 'F'],
      name: 'D#add9',
      chordType: 'add9',
      rootNote: 'D#',
      inversion: null,
      bassNote: null,
    }),
  ]);;
  expect(getChordByNotes(['A#', 'D', 'F#', 'A']).exactMatches).toEqual([
    new Chord({
      notes: ['A#', 'D', 'F#', 'A'],
      name: 'D',
      chordType: '',
      rootNote: 'D',
      inversion: null,
      bassNote: 'A#',
    }),
  ]);;
  expect(getChordByNotes(['E', 'Bb', 'Db', 'F']).exactMatches).toEqual([
    new Chord({
      notes: ['E', 'A#', 'C#', 'F'],
      name: 'A#m',
      chordType: 'm',
      rootNote: 'A#',
      inversion: null,
      bassNote: 'E',
    }),
  ]);;
});