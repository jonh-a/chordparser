import { ChordT } from '../types';
import { constructChord } from '../chord';
import {
  changeAccidential,
  generateAllPossiblePermutationsFromNotesArray,
  removeDuplicateAndNullNotes,
  handleBassNoteIfNotRootNote,
  doesArrayContainSubset,
} from '../util';

export const getChordByNotes = (notes: string[]): {
  exactMatches: ChordT[],
  possibleMatches: ChordT[],
} => {
  const normalizedNotes = removeDuplicateAndNullNotes(notes.map(
    (note: string) => changeAccidential(note, 'sharps'),
  ));

  let allPossibleChordTypes = generateAllPossiblePermutationsFromNotesArray(normalizedNotes);

  let possibleMatches = allPossibleChordTypes
    .filter((chordType: ChordT) => doesArrayContainSubset(chordType.notes, normalizedNotes));

  let exactMatches = possibleMatches
    .filter((chord: ChordT) => (
      JSON.stringify([...chord.notes].sort()) === JSON.stringify([...normalizedNotes].sort())),
    )
    .map((chord: ChordT) => {
      const { name, notes, bassNote } = handleBassNoteIfNotRootNote(
        normalizedNotes[0],
        chord.rootNote,
        chord.notes,
        chord.name,
      );
      return { ...chord, name, notes, bassNote };
    });

  /*
    If no exact matches are found, strip the bass note and treat the notes array 
    like a slash chord.

    Messy implementation but gets the job done for now.
  */
  if (exactMatches.length === 0) {
    const [bassNote, ...chordNotes] = normalizedNotes;
    allPossibleChordTypes = generateAllPossiblePermutationsFromNotesArray(chordNotes);

    possibleMatches = allPossibleChordTypes
      .filter((chordType: ChordT) => doesArrayContainSubset(chordType.notes, chordNotes))
      .map((chord: ChordT) => ({ ...chord, bassNote }));

    exactMatches = possibleMatches
      .filter((chord: ChordT) => (
        JSON.stringify([...chord.notes].sort()) === JSON.stringify([...chordNotes].sort())),
      )
      .map((chord: ChordT) => {
        const { name, notes, bassNote } = handleBassNoteIfNotRootNote(
          normalizedNotes[0],
          chord.rootNote,
          chord.notes,
          chord.name,
        );
        return { ...chord, name, notes, bassNote };
      });
  };

  const possibleChords = possibleMatches.map((chord: ChordT) => constructChord(chord));
  const exactChords = exactMatches.map((chord: ChordT) => constructChord(chord));

  return { exactMatches: exactChords, possibleMatches: possibleChords };
};