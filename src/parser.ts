import { Chord } from './types';
import {
  changeAccidential,
  chordTypes,
  getNotesInScale,
  handleInversion,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
  getNotesFromChordType,
  doesArrayContainSubset,
  removeDuplicateNotes,
} from './util';

export const getChordNotesByName = (chordInput: Chord | string): Chord => {
  const chord: Chord = typeof chordInput === 'string' ? { name: chordInput } : chordInput;

  if (!chord.name || chord.name === '') return { notes: [], name: '' };

  const { chordName, bassNote } = seperateChordNameAndBassNote(chord.name);
  const { rootNote, chordType } = getRootNoteAndChordTypeFromName(chordName);

  const { notes, scale } = getNotesInScale(rootNote, chordType);
  const transformedBassNote = changeAccidential(bassNote, scale);

  if (!Object.keys(chordTypes).includes(chordType)) return { notes: [], name: chord.name };

  let chordNotes = getNotesFromChordType(rootNote, chordType);

  if (chord.inversion) chordNotes = handleInversion(chordNotes, chord.inversion);

  if (transformedBassNote && notes.indexOf(transformedBassNote) > -1) {
    chordNotes.unshift(transformedBassNote);
  }

  return {
    notes: chordNotes,
    bassNote: transformedBassNote ?? null,
    name: chordName,
    inversion: chord.inversion ?? null,
  };
};

export const getChordNameFromNotes = (notes: string[]): {
  exactMatches: Chord[],
  possibleMatches: Chord[],
} => {
  const normalizedNotes = removeDuplicateNotes(notes.map(
    (note: string) => changeAccidential(note, 'sharps'),
  ));

  const nonDuplicateChordTypes = Object.keys(chordTypes)
    .filter((chordKey: string) => !chordTypes[chordKey].duplicate);

  const allPossibleChordTypes = normalizedNotes
    .map((rootNote: string) => (
      nonDuplicateChordTypes
        .map((chordType: string) => ({
          name: `${rootNote}${chordType}`,
          notes: getNotesFromChordType(rootNote, chordType),
          rootNote,
        }))
    ))
    .flat();

  const possibleMatches = allPossibleChordTypes
    .filter((chordType: Chord) => doesArrayContainSubset(chordType.notes, normalizedNotes));

  const exactMatches = possibleMatches
    .filter((chordType: Chord) => (
      JSON.stringify([...chordType.notes].sort()) === JSON.stringify([...normalizedNotes].sort())),
    );

  return { exactMatches, possibleMatches };
};