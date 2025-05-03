import { ChordT, GuitarChord } from './types';
import {
  changeAccidential,
  chordTypes,
  getNotesInScale,
  handleInversion,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
  getNotesFromChordType,
  doesArrayContainSubset,
  generateAllPossibleChords,
  constructChord,
  notesAsSharps,
  removeDuplicateAndNullNotes,
  suffixBassNoteIfNotRootNote,
} from './util';

export const getChordByName = (chordInput: ChordT | string): ChordT => {
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

export const getChordByNotes = (notes: string[]): {
  exactMatches: ChordT[],
  possibleMatches: ChordT[],
} => {
  const normalizedNotes = removeDuplicateAndNullNotes(notes.map(
    (note: string) => changeAccidential(note, 'sharps'),
  ));

  let allPossibleChordTypes = generateAllPossibleChords(normalizedNotes);

  let possibleMatches = allPossibleChordTypes
    .filter((chordType: ChordT) => doesArrayContainSubset(chordType.notes, normalizedNotes));

  let exactMatches = possibleMatches
    .filter((chord: ChordT) => (
      JSON.stringify([...chord.notes].sort()) === JSON.stringify([...normalizedNotes].sort())),
    )
    .map((chord: ChordT) => {
      const { name, notes } = suffixBassNoteIfNotRootNote(
        normalizedNotes[0], 
        chord.rootNote, 
        chord.notes, 
        chord.name,
      );
      return { 
        ...chord, 
        name, 
        notes: removeDuplicateAndNullNotes(notes), 
        bassNote: normalizedNotes[0] !== chord.rootNote ? normalizedNotes[0] : null, 
      };
    });

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
      .map((chord: ChordT) => { 
        const { name, notes } = suffixBassNoteIfNotRootNote(
          normalizedNotes[0], 
          chord.rootNote, 
          chord.notes, 
          chord.name,
        );
        return { 
          ...chord, 
          name, 
          notes: removeDuplicateAndNullNotes(notes), 
          bassNote: bassNote !== chord.rootNote ? bassNote : null,
        };
      });
  };
  
  const possibleChords = possibleMatches.map((chord: ChordT) => constructChord(chord));
  const exactChords = exactMatches.map((chord: ChordT) => constructChord(chord));

  return { exactMatches: exactChords, possibleMatches: possibleChords };
};

export const getChordByGuitarVoicing = (chordInput: GuitarChord | (number | null)[]) => {
  const chord: GuitarChord = Array.isArray(chordInput) 
    ? { tuning: 'EADGBE', notes: chordInput } 
    : chordInput;

  const normalizedTuning = chord.tuning
    .split('')
    .map((string: string) => changeAccidential(string, 'sharps'));

  const notes = chord.notes.map((fret: number, index: number) => {
    const stringTuning = normalizedTuning[index];
    const startingIndex = notesAsSharps.indexOf(stringTuning);
    const note = fret !== null ? notesAsSharps[startingIndex + fret] : null;
    return note;
  });

  return getChordByNotes(notes);
};