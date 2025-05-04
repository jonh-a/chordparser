import { GuitarChord } from '../types';
import { 
  changeAccidential,
  notesAsSharps,
} from '../util';
import { getChordByNotes } from './chordByNotes';

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