import { Chord } from "./types";
import { swapFlatsWithSharps, chordStructures, notes } from "./util";

export const getChordNotesByName = (chord: Chord): string[] => {
  /*
  Given a chord, return the associated notes.
  */
  const bassNote = chord.name?.endsWith('9') ? '' : chord.name?.split('/')?.[1];
  if (bassNote) chord.name = chord.name?.split('/')?.[0];

  if (!chord.name || chord.name === '') return [];

  const transformedChordName = swapFlatsWithSharps(chord.name);

  /* 
    Split the chord into root note and chord type either at a space 
    or immediately after the flat/sharp notation.
    Otherwise just split after first character.
  */
  let splitIdx = 0;
  if (transformedChordName.includes(' ')) splitIdx = transformedChordName.indexOf(' ');
  if (transformedChordName?.[1] === '#' || transformedChordName?.[1] === 'b') splitIdx = 1;

  const rootNote = transformedChordName?.substring(0, splitIdx + 1)?.trim();
  const chordType = transformedChordName?.substring(splitIdx + 1)?.trim();

  /* If no chord type found, return */
  if (!Object.keys(chordStructures).includes(chordType)) return [];

  const rootNoteIdx: number = notes?.indexOf(rootNote);
  let chordNotes: string[] = [];

  const chordStructure = chordStructures[chordType];
  chordStructure?.forEach((n: number) => {
    chordNotes.push(notes[rootNoteIdx + n]);
  });

  if (chord.inversion) {
    chordNotes = handleInversion(chordNotes, chord.inversion);
  }

  if (bassNote && notes.indexOf(bassNote) > -1) {
    chordNotes.unshift(bassNote);
  }

  return chordNotes;
};

const handleInversion = (notes: string[], inversion: number): string[] => {
  const notesBeforeInversion = notes.slice(0, inversion);
  const notesAfterInversion = notes.slice(inversion);

  return [...notesAfterInversion, ...notesBeforeInversion];
};