import { Chord } from "./types";
import {
  swapFlatsWithSharps,
  chordTypes,
  notes,
  handleInversion,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
  getNotesFromChordType,
  checkSubset,
  removeDuplicateNotes,
} from "./util";

export const getChordNotesByName = (chord: Chord): Chord => {
  if (!chord.name || chord.name === '') return { notes: [], name: '' };

  // Extract base chord name and bass note, if the chord is a slash chord.
  const { chordName, bassNote } = seperateChordNameAndBassNote(chord.name)

  // Flats in the chord name are transformed to sharps for consistent indexing.
  const transformedChordName = swapFlatsWithSharps(chordName);
  const transformedBassNote = swapFlatsWithSharps(bassNote)

  const { chordType, rootNote } = getRootNoteAndChordTypeFromName(transformedChordName)

  // If no matching chord type found, return.
  if (!Object.keys(chordTypes).includes(chordType)) return { notes: [], name: chord.name };

  let chordNotes = getNotesFromChordType(rootNote, chordType)

  if (chord.inversion) chordNotes = handleInversion(chordNotes, chord.inversion);

  // Prepend the bass note, if there is one, to the array of notes.
  if (transformedBassNote && notes.indexOf(transformedBassNote) > -1) {
    chordNotes.unshift(transformedBassNote);
  }

  return {
    notes: chordNotes,
    bassNote: transformedBassNote ?? null,
    name: transformedChordName,
    inversion: chord.inversion ?? null,
  };
};

export const getChordNameFromNotes = (notes: string[]): {
  exactMatches: Chord[],
  possibleMatches: Chord[],
} => {
  const normalizedNotes = removeDuplicateNotes(notes.map((note: string) => swapFlatsWithSharps(note)));

  const allPossibleChordTypes = normalizedNotes
    .map((rootNote: string) => {
      return Object.keys(chordTypes)
        .map((chordType: string) => ({
          name: `${rootNote}${chordType}`,
          notes: getNotesFromChordType(rootNote, chordType),
          rootNote,
        }));
    })
    .flat();

  const possibleMatches = allPossibleChordTypes
    .filter((chordType: Chord) => checkSubset(chordType.notes, normalizedNotes));

  const exactMatches = possibleMatches
    .filter((chordType: Chord) => (
      JSON.stringify([...chordType.notes].sort()) === JSON.stringify([...normalizedNotes].sort()))
    );

  return { exactMatches, possibleMatches };
};