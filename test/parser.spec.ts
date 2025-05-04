import { getChordByGuitarVoicing, getChordByName, getChordByNotes } from '../src/parser';
import { Chord } from '../src/chord';

test('test basic string input', () => {
  expect(getChordByName('Cmaj7')).toStrictEqual(
    new Chord({
      notes: ['C', 'E', 'G', 'B'],
      name: 'Cmaj7',
      bassNote: null,
      inversion: null,
      chordType: 'maj7',
      rootNote: 'C',
    }),
  );

  expect(getChordByName('Db7')).toStrictEqual(
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
  expect(getChordByName({ name: 'C' })).toStrictEqual(
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordByName({ name: 'D#m7' })).toStrictEqual(
    new Chord({
      notes: ['D#', 'F#', 'A#', 'C#'],
      name: 'D#m7',
      bassNote: null,
      inversion: null,
      rootNote: 'D#',
      chordType: 'm7',
    }),
  );
  expect(getChordByName({ name: 'Db7' })).toStrictEqual(
    new Chord({
      notes: ['Db', 'F', 'Ab', 'B'],
      name: 'Db7',
      bassNote: null,
      inversion: null,
      rootNote: 'Db',
      chordType: '7',
    }),
  );
  expect(getChordByName({ name: 'Cm7' })).toStrictEqual(
    new Chord({
      notes: ['C', 'Eb', 'G', 'Bb'],
      name: 'Cm7',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: 'm7',
    }),
  );
  expect(getChordByName({ name: 'C6/9' })).toStrictEqual(
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
  expect(getChordByName({ name: 'C/G' })).toStrictEqual(
    new Chord({
      notes: ['G', 'C', 'E', 'G'],
      name: 'C',
      bassNote: 'G',
      inversion: null,
      chordType: '',
      rootNote: 'C',
    }),
  );
  expect(getChordByName({ name: 'D#m7/F#' })).toStrictEqual(
    new Chord({
      notes: ['F#', 'D#', 'F#', 'A#', 'C#'],
      name: 'D#m7',
      bassNote: 'F#',
      inversion: null,
      rootNote: 'D#',
      chordType: 'm7',
    }),
  );
  expect(getChordByName({ name: 'Cm7/G' })).toStrictEqual(
    new Chord({
      notes: ['G', 'C', 'Eb', 'G', 'Bb'],
      name: 'Cm7',
      bassNote: 'G',
      inversion: null,
      chordType: 'm7',
      rootNote: 'C',
    }),
  );
  expect(getChordByName({ name: 'C6/9/G' })).toStrictEqual(
    new Chord({
      notes: ['G', 'C', 'E', 'G', 'A', 'D'],
      name: 'C6/9',
      bassNote: 'G',
      inversion: null,
      rootNote: 'C',
      chordType: '6/9',
    }),
  );
  expect(getChordByName({ name: 'Db7/Ab' })).toStrictEqual(
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
  expect(getChordByName({ name: 'C', inversion: 1 })).toStrictEqual(
    new Chord({
      notes: ['E', 'G', 'C'],
      name: 'C',
      bassNote: null,
      inversion: 1,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordByName({ name: 'C/G', inversion: 1 })).toStrictEqual(
    new Chord({
      notes: ['G', 'E', 'G', 'C'],
      name: 'C',
      bassNote: 'G',
      inversion: 1,
      chordType: '',
      rootNote: 'C',
    }),
  );
  expect(getChordByName({ name: 'C', inversion: 2 })).toStrictEqual(
    new Chord({
      notes: ['G', 'C', 'E'],
      name: 'C',
      bassNote: null,
      inversion: 2,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordByName({ name: 'C/G', inversion: 2 })).toStrictEqual(
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
  expect(getChordByNotes(['C', 'E', 'G']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByNotes(['G', 'C', 'E']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['G', 'C', 'E'],
      name: 'C/G',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: 'G',
    }),
  ]);
  expect(getChordByNotes(['G', 'D', 'F#', 'A']).exactMatches).toStrictEqual([
    new Chord({
      notes: [ 'G', 'D', 'F#', 'A'],
      name: 'D/G',
      chordType: '',
      rootNote: 'D',
      inversion: null,
      bassNote: 'G',
    }),
  ]);
  expect(getChordByNotes(['G', 'G', 'C', 'E']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['G', 'C', 'E'],
      name: 'C/G',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: 'G',
    }),
  ]);
  expect(getChordByNotes(['G', 'B', 'C', 'E']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['G', 'C', 'E', 'B'],
      name: 'Cmaj7/G',
      chordType: 'maj7',
      rootNote: 'C',
      inversion: null,
      bassNote: 'G',
    }),
  ]);
  expect(getChordByNotes(['G', 'Bb', 'Eb', 'F']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['G', 'D#', 'A#', 'F'],
      name: 'D#add9/G',
      chordType: 'add9',
      rootNote: 'D#',
      inversion: null,
      bassNote: 'G',
    }),
  ]);
  expect(getChordByNotes(['A#', 'D', 'F#', 'A']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['A#', 'D', 'F#', 'A'],
      name: 'D/A#',
      chordType: '',
      rootNote: 'D',
      inversion: null,
      bassNote: 'A#',
    }),
  ]);;
  expect(getChordByNotes(['E', 'Bb', 'Db', 'F']).exactMatches).toStrictEqual([
    new Chord({
      notes: ['E', 'A#', 'C#', 'F'],
      name: 'A#m/E',
      chordType: 'm',
      rootNote: 'A#',
      inversion: null,
      bassNote: 'E',
    }),
  ]);;
});

test('test guitar chord parsing', () => {
  expect(getChordByGuitarVoicing({
    tuning: 'DADGBE',
    notes: [2, 2, 2, 0, 0, 0],
  }).exactMatches).toStrictEqual([
    new Chord({
      notes: ['E', 'G', 'B'],
      name: 'Em',
      chordType: 'm',
      rootNote: 'E',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByGuitarVoicing({
    tuning: 'EADGBE',
    notes: [3, 2, 0, 0, 3, 3],
  }).exactMatches).toStrictEqual([
    new Chord({
      notes: ['G', 'B', 'D'],
      name: 'G',
      chordType: '',
      rootNote: 'G',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordByGuitarVoicing({
    tuning: 'EADGBE',
    notes: [3, 0, 0, 2, 1, 2],
  }).exactMatches).toStrictEqual([
    new Chord({
      notes: ['G', 'D', 'F#', 'A', 'C'],
      name: 'D7/G',
      chordType: '7',
      rootNote: 'D',
      inversion: null,
      bassNote: 'G',
    }),
  ]);
  expect(getChordByGuitarVoicing([1, 2, 2, 0, 0, 0]).exactMatches)
  .toStrictEqual([
    new Chord({
      notes: ['F', 'E', 'G', 'B'],
      name: 'Em/F',
      chordType: 'm',
      rootNote: 'E',
      inversion: null,
      bassNote: 'F',
    }),
  ]);
  expect(getChordByGuitarVoicing([null, null, 0, 2, null, null]).exactMatches)
  .toStrictEqual([
    new Chord({
      notes: ['D', 'A'],
      name: 'D5',
      chordType: '5',
      rootNote: 'D',
      inversion: null,
      bassNote: null,
    }),
  ]);
});