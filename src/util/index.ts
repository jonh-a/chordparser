import { doesArrayContainSubset, areArraysEqual } from './misc';
import {
  chordTypes,
  notesAsFlats,
  notesAsSharps,
  notateSlashChord,
  changeAccidential,
  generateAllPossibleChordsFromRootNote,
  generateAllPossiblePermutationsFromNotesArray,
  getNotesFromChordType,
  getNotesInScale,
  removeDuplicateAndNullNotes,
  transposeRootNote,
  handleBassNoteIfNotRootNote,
  handleInversion,
  getAllChordTypes,
} from './notes';
import {
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
} from './parsing';

export {
  doesArrayContainSubset,
  chordTypes,
  notesAsFlats,
  notesAsSharps,
  notateSlashChord,
  changeAccidential,
  generateAllPossibleChordsFromRootNote,
  generateAllPossiblePermutationsFromNotesArray,
  getNotesFromChordType,
  getNotesInScale,
  removeDuplicateAndNullNotes,
  transposeRootNote,
  handleBassNoteIfNotRootNote,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
  handleInversion,
  getAllChordTypes,
  areArraysEqual,
};