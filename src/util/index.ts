import { doesArrayContainSubset } from './misc';
import { 
  chordTypes, 
  notesAsFlats, 
  notesAsSharps, 
  notateSlashChord, 
  changeAccidential, 
  generateAllPossibleChords, 
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
  generateAllPossibleChords, 
  getNotesFromChordType, 
  getNotesInScale,
  removeDuplicateAndNullNotes,
  transposeRootNote,
  handleBassNoteIfNotRootNote,
  seperateChordNameAndBassNote, 
  getRootNoteAndChordTypeFromName,
  handleInversion,
  getAllChordTypes,
};