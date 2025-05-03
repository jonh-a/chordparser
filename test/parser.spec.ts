import { getChordNotesByName, getChordNameFromNotes } from '../src/parser';
import { Chord } from '../src/chord';

test('test basic string input', () => {
  expect(getChordNotesByName('Cmaj7')).toEqual(
    new Chord({
      notes: ['C', 'E', 'G', 'B'],
      name: 'Cmaj7',
      bassNote: null,
      inversion: null,
      chordType: 'maj7',
      rootNote: 'C',
    }),
  );

  expect(getChordNotesByName('Db7')).toEqual(
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
  expect(getChordNotesByName({ name: 'C' })).toEqual(
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordNotesByName({ name: 'D#m7' })).toEqual(
    new Chord({
      notes: ['D#', 'F#', 'A#', 'C#'],
      name: 'D#m7',
      bassNote: null,
      inversion: null,
      rootNote: 'D#',
      chordType: 'm7',
    }),
  );
  expect(getChordNotesByName({ name: 'Db7' })).toEqual(
    new Chord({
      notes: ['Db', 'F', 'Ab', 'B'],
      name: 'Db7',
      bassNote: null,
      inversion: null,
      rootNote: 'Db',
      chordType: '7',
    }),
  );
  expect(getChordNotesByName({ name: 'Cm7' })).toEqual(
    new Chord({
      notes: ['C', 'Eb', 'G', 'Bb'],
      name: 'Cm7',
      bassNote: null,
      inversion: null,
      rootNote: 'C',
      chordType: 'm7',
    }),
  );
  expect(getChordNotesByName({ name: 'C6/9' })).toEqual(
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
  expect(getChordNotesByName({ name: 'C/G' })).toEqual(
    new Chord({
      notes: ['G', 'C', 'E', 'G'],
      name: 'C',
      bassNote: 'G',
      inversion: null,
      chordType: '',
      rootNote: 'C',
    }),
  );
  expect(getChordNotesByName({ name: 'D#m7/F#' })).toEqual(
    new Chord({
      notes: ['F#', 'D#', 'F#', 'A#', 'C#'],
      name: 'D#m7',
      bassNote: 'F#',
      inversion: null,
      rootNote: 'D#',
      chordType: 'm7',
    }),
  );
  expect(getChordNotesByName({ name: 'Cm7/G' })).toEqual(
    new Chord({
      notes: ['G', 'C', 'Eb', 'G', 'Bb'],
      name: 'Cm7',
      bassNote: 'G',
      inversion: null,
      chordType: 'm7',
      rootNote: 'C',
    }),
  );
  expect(getChordNotesByName({ name: 'C6/9/G' })).toEqual(
    new Chord({
      notes: ['G', 'C', 'E', 'G', 'A', 'D'],
      name: 'C6/9',
      bassNote: 'G',
      inversion: null,
      rootNote: 'C',
      chordType: '6/9',
    }),
  );
  expect(getChordNotesByName({ name: 'Db7/Ab' })).toEqual(
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
  expect(getChordNotesByName({ name: 'C', inversion: 1 })).toEqual(
    new Chord({
      notes: ['E', 'G', 'C'],
      name: 'C',
      bassNote: null,
      inversion: 1,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordNotesByName({ name: 'C/G', inversion: 1 })).toEqual(
    new Chord({
      notes: ['G', 'E', 'G', 'C'],
      name: 'C',
      bassNote: 'G',
      inversion: 1,
      chordType: '',
      rootNote: 'C',
    }),
  );
  expect(getChordNotesByName({ name: 'C', inversion: 2 })).toEqual(
    new Chord({
      notes: ['G', 'C', 'E'],
      name: 'C',
      bassNote: null,
      inversion: 2,
      rootNote: 'C',
      chordType: '',
    }),
  );
  expect(getChordNotesByName({ name: 'C/G', inversion: 2 })).toEqual(
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
  expect(getChordNameFromNotes(['C', 'E', 'G']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordNameFromNotes(['G', 'C', 'E']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordNameFromNotes(['G', 'G', 'C', 'E']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G'],
      name: 'C',
      chordType: '',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordNameFromNotes(['G', 'B', 'C', 'E']).exactMatches).toEqual([
    new Chord({
      notes: ['C', 'E', 'G', 'B'],
      name: 'Cmaj7',
      chordType: 'maj7',
      rootNote: 'C',
      inversion: null,
      bassNote: null,
    }),
  ]);
  expect(getChordNameFromNotes(['G', 'Bb', 'Eb', 'F']).exactMatches).toEqual([
    new Chord({
      notes: ['D#', 'G', 'A#', 'F'],
      name: 'D#add9',
      chordType: 'add9',
      rootNote: 'D#',
      inversion: null,
      bassNote: null,
    }),
  ]);;
  expect(getChordNameFromNotes(['A#', 'D', 'F#', 'A']).exactMatches).toEqual([
    new Chord({
      notes: ['A#', 'D', 'F#', 'A'],
      name: 'D',
      chordType: '',
      rootNote: 'D',
      inversion: null,
      bassNote: 'A#',
    }),
  ]);;
  expect(getChordNameFromNotes(['E', 'Bb', 'Db', 'F']).exactMatches).toEqual([
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