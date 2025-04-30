import { ChordT } from './types';
import { Chord } from './chord';
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

export const getChordNotesByName = (chordInput: ChordT | string): ChordT => {
  const chord: ChordT = typeof chordInput === 'string' ? { name: chordInput } : chordInput;

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

  return new Chord({
    name: chordName,
    notes: chordNotes,
    bassNote: transformedBassNote ?? null,
    inversion: chord.inversion ?? null,
    rootNote,
    chordType,
  });
};

export const getChordNameFromNotes = (notes: string[]): {
  exactMatches: ChordT[],
  possibleMatches: ChordT[],
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
          chordType,
          rootNote,
        }))
    ))
    .flat();

  const possibleMatches = allPossibleChordTypes
    .filter((chordType: ChordT) => doesArrayContainSubset(chordType.notes, normalizedNotes))
    .map((chord: ChordT) => (
      new Chord({
        name: chord.name,
        notes: chord.notes,
        rootNote: chord.rootNote,
        bassNote: chord?.bassNote ?? null,
        chordType: chord.chordType,
        inversion: chord?.inversion ?? null,
      })
    ));

  const exactMatches = possibleMatches
    .filter((chord: Chord) => (
      JSON.stringify([...chord.notes].sort()) === JSON.stringify([...normalizedNotes].sort())),
    )

  return { exactMatches, possibleMatches };
};