import { getChordNotesByName, getChordNameFromNotes } from '../src/parser';

test('test major triads', () => {
  expect(getChordNotesByName({ name: 'C' })).toEqual({
    notes: ['C', 'E', 'G'],
    name: 'C',
    bassNote: null,
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'D#m7' })).toEqual({
    notes: ['D#', 'F#', 'A#', 'C#'],
    name: 'D#m7',
    bassNote: null,
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'Db7' })).toEqual({
    notes: ['C#', 'F', 'G#', 'B'],
    name: 'C#7',
    bassNote: null,
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'Cm7' })).toEqual({
    notes: ['C', 'D#', 'G', 'A#'],
    name: 'Cm7',
    bassNote: null,
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'C6/9' })).toEqual({
    notes: ['C', 'E', 'G', 'A', 'D'],
    name: 'C6/9',
    bassNote: null,
    inversion: null,
  });
});

test('test triads with bass notes', () => {
  expect(getChordNotesByName({ name: 'C/G' })).toEqual({
    notes: ['G', 'C', 'E', 'G'],
    name: 'C',
    bassNote: 'G',
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'D#m7/F#' })).toEqual({
    notes: ['F#', 'D#', 'F#', 'A#', 'C#'],
    name: 'D#m7',
    bassNote: 'F#',
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'Cm7/G' })).toEqual({
    notes: ['G', 'C', 'D#', 'G', 'A#'],
    name: 'Cm7',
    bassNote: 'G',
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'C6/9/G' })).toEqual({
    notes: ['G', 'C', 'E', 'G', 'A', 'D'],
    name: 'C6/9',
    bassNote: 'G',
    inversion: null,
  });
  expect(getChordNotesByName({ name: 'Db7/Bb' })).toEqual({
    notes: ['A#', 'C#', 'F', 'G#', 'B'],
    name: 'C#7',
    bassNote: 'A#',
    inversion: null,
  });
});

test('test inversions', () => {
  expect(getChordNotesByName({ name: 'C', inversion: 1 })).toEqual({
    notes: ['E', 'G', 'C'],
    name: 'C',
    bassNote: null,
    inversion: 1,
  });
  expect(getChordNotesByName({ name: 'C/G', inversion: 1 })).toEqual({
    notes: ['G', 'E', 'G', 'C'],
    name: 'C',
    bassNote: 'G',
    inversion: 1,
  });
  expect(getChordNotesByName({ name: 'C', inversion: 2 })).toEqual({
    notes: ['G', 'C', 'E'],
    name: 'C',
    bassNote: null,
    inversion: 2,
  });
  expect(getChordNotesByName({ name: 'C/G', inversion: 2 })).toEqual({
    notes: ['G', 'G', 'C', 'E'],
    name: 'C',
    bassNote: 'G',
    inversion: 2,
  });
});

test('test parsing name from notes', () => {
  expect(getChordNameFromNotes(['C', 'E', 'G']).exactMatches.length).toEqual(2);
  expect(getChordNameFromNotes(['G', 'C', 'E']).exactMatches.length).toEqual(2);
  expect(getChordNameFromNotes(['G', 'G', 'C', 'E']).exactMatches.length).toEqual(2);
  expect(getChordNameFromNotes(['G', 'C', 'E', 'B']).exactMatches.length).toEqual(1);
  expect(getChordNameFromNotes(['G', 'Bb', 'Eb']).exactMatches.length).toEqual(2);
});