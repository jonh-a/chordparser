import { ChordT } from '../types';
import { Chord } from '../chord';
import { constructChord } from '../chord';
import { 
  changeAccidential,
  chordTypes,
  getNotesInScale,
  getNotesFromChordType,
  handleInversion,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
} from '../util';

export const getChordByName = (chordInput: ChordT | string): Chord => {
  const chord: ChordT = typeof chordInput === 'string' ? { name: chordInput } : chordInput;
  if (!chord.name || chord.name === '') return new Chord({ notes: [], name: '' });

  const { chordName, bassNote } = seperateChordNameAndBassNote(chord.name);
  const { rootNote, chordType } = getRootNoteAndChordTypeFromName(chordName);
  const { notes, scale } = getNotesInScale(rootNote, chordType);
  const transformedBassNote = changeAccidential(bassNote, scale);

  if (!Object.keys(chordTypes).includes(chordType)) return new Chord({ notes: [], name: '' });
  let chordNotes = getNotesFromChordType(rootNote, chordType);

  if (chord.inversion) chordNotes = handleInversion(chordNotes, chord.inversion);
  if (transformedBassNote && notes.indexOf(transformedBassNote) > -1) {
    chordNotes.unshift(transformedBassNote);
  }

  return constructChord({
    name: chord.name,
    notes: chordNotes,
    bassNote: transformedBassNote ?? null,
    inversion: chord.inversion ?? null,
    rootNote,
    chordType,
  });
};