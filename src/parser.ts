import { ChordT } from './types';
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
  generateAllPossibleChords,
  constructChord,
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

  return constructChord({
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

  let allPossibleChordTypes = generateAllPossibleChords(normalizedNotes);

  let possibleMatches = allPossibleChordTypes
    .filter((chordType: ChordT) => doesArrayContainSubset(chordType.notes, normalizedNotes));

  let exactMatches = possibleMatches
    .filter((chord: ChordT) => (
      JSON.stringify([...chord.notes].sort()) === JSON.stringify([...normalizedNotes].sort())),
    );

  /*
    If no exact matches are found, strip the bass note and treat the notes array 
    like a slash chord.

    Messy implementation but gets the job done for now.
  */
  if (exactMatches.length === 0) {
    const [bassNote, ...chordNotes] = normalizedNotes;
    allPossibleChordTypes = generateAllPossibleChords(chordNotes);

    possibleMatches = allPossibleChordTypes
      .filter((chordType: ChordT) => doesArrayContainSubset(chordType.notes, chordNotes))
      .map((chord: ChordT) => ({ ...chord, bassNote }));
    
    exactMatches = possibleMatches
      .filter((chord: ChordT) => (
        JSON.stringify([...chord.notes].sort()) === JSON.stringify([...chordNotes].sort())),
      )
      .map((chord: ChordT) => ({ ...chord, bassNote, notes: normalizedNotes }));
  };
  
  const possibleChords = possibleMatches.map((chord: ChordT) => constructChord(chord));
  const exactChords = exactMatches.map((chord: ChordT) => constructChord(chord));

  return { exactMatches: exactChords, possibleMatches: possibleChords };
};