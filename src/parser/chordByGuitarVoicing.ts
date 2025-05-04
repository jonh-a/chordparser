import { GuitarChord } from '../types';
import { 
  changeAccidential,
  notesAsSharps,
} from '../util';
import { getChordByNotes } from './chordByNotes';

export const getChordByGuitarVoicing = (chordInput: GuitarChord | (number | null)[]) => {
  const chord: GuitarChord = Array.isArray(chordInput) 
    ? { tuning: ['E', 'A', 'D', 'G', 'B', 'E'], notes: chordInput } 
    : chordInput;

  const normalizedTuning = chord.tuning
    .map((string: string) => changeAccidential(string, 'sharps'));

  const notes = chord.notes.map((fret: number, index: number) => {
    const stringTuning = normalizedTuning[index];
    const startingIndex = notesAsSharps.indexOf(stringTuning);
    const note = fret !== null ? notesAsSharps[startingIndex + fret] : null;
    return note;
  });

  return getChordByNotes(notes);
};