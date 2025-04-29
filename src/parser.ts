import { ChordName, ChordNotes } from "./types";
import {
  swapFlatsWithSharps,
  chordStructures,
  notes,
  handleInversion,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
  getChordNotesFromStructure,
} from "./util";

export const getChordNotesByName = (chord: ChordName): ChordNotes => {
  if (!chord.name || chord.name === '') return { notes: [], name: '' };

  // Extract base chord name and bass note, if the chord is a slash chord.
  const { chordName, bassNote } = seperateChordNameAndBassNote(chord.name)

  // Flats in the chord name are transformed to sharps for consistent indexing.
  const transformedChordName = swapFlatsWithSharps(chordName);
  const transformedBassNote = swapFlatsWithSharps(bassNote)

  const { chordType, rootNote } = getRootNoteAndChordTypeFromName(transformedChordName)

  // If no matching chord type found, return.
  if (!Object.keys(chordStructures).includes(chordType)) return { notes: [], name: chord.name };

  let chordNotes = getChordNotesFromStructure(rootNote, chordType)

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
