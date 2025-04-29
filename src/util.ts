export const notes = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#',
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#',
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#',
];

export const chordStructures: { [index: string]: number[] } = {
  // triads
  'maj': [0, 4, 7],
  '(b5)': [0, 4, 6],
  '': [0, 4, 7],
  'min': [0, 3, 7],
  'm': [0, 3, 7],
  '5': [0, 7],
  'sus2': [0, 2, 7],
  'sus4': [0, 5, 7],
  'dim': [0, 3, 6],
  'aug': [0, 4, 8],
  '+': [0, 4, 8],

  // tetrads
  '6': [0, 4, 7, 9],
  'm6': [0, 3, 7, 9],
  'min6': [0, 3, 7, 9],
  '7': [0, 4, 7, 10],
  '7sus4': [0, 5, 7, 10],
  'maj7': [0, 4, 7, 11],
  'min7': [0, 3, 7, 10],
  'm7': [0, 3, 7, 10],
  'm7b5': [0, 3, 6, 10],
  'min7b5': [0, 3, 6, 10],
  'dim7': [0, 3, 6, 9],
  'add9': [0, 4, 7, 14],
  'addb9': [0, 4, 7, 13],
  '(add9)': [0, 4, 7, 14],
  '(addb9)': [0, 4, 7, 13],
  'madd9': [0, 3, 7, 14],
  'm(add9)': [0, 3, 7, 14],
  'mmaj7': [0, 3, 7, 11],

  // extended chords
  '6/9': [0, 4, 7, 9, 14],
  'm6/9': [0, 3, 7, 9, 14],
  'min6/9': [0, 3, 7, 9, 14],

  '9': [0, 4, 7, 10, 14],
  '9sus4': [0, 5, 7, 10, 14],
  'maj9': [0, 4, 7, 11, 14],
  'min9': [0, 3, 7, 10, 14],
  'm9': [0, 3, 7, 10, 14],

  '11': [0, 4, 7, 10, 14, 17],
  'maj11': [0, 4, 7, 11, 14, 17],
  'm11': [0, 3, 7, 11, 14, 17],
  'min11': [0, 4, 7, 11, 14, 17],
  'maj7#11': [0, 4, 7, 11, 18],

  '13': [0, 4, 7, 10, 14, 17, 21],
  '13sus4': [0, 5, 7, 10, 14, 17, 21],
  'maj13': [0, 4, 7, 11, 14, 17, 21],
  'm13': [0, 3, 7, 11, 14, 17, 21],
  'min13': [0, 4, 7, 11, 14, 17, 21],
};

export const swapFlatsWithSharps = (str: string) => {
  if (str?.startsWith("Bb")) return str.replace('Bb', 'A#');
  if (str?.startsWith("Db")) return str.replace('Db', 'C#');
  if (str?.startsWith("Eb")) return str.replace('Eb', 'D#');
  if (str?.startsWith("Gb")) return str.replace('Gb', 'F#');
  if (str?.startsWith("Ab")) return str.replace('Ab', 'G#');
  return str;
};

export const swapSharpsWithFlats = (str: string) => {
  if (str?.startsWith("A#")) return str.replace('A#', 'Bb');
  if (str?.startsWith("C#")) return str.replace('C#', 'Db');
  if (str?.startsWith("D#")) return str.replace('D#', 'Eb');
  if (str?.startsWith("F#")) return str.replace('F#', 'Gb');
  if (str?.startsWith("G#")) return str.replace('G#', 'Ab');
  return str;
};

export const handleInversion = (notes: string[], inversion: number): string[] => {
  const notesBeforeInversion = notes.slice(0, inversion);
  const notesAfterInversion = notes.slice(inversion);

  return [...notesAfterInversion, ...notesBeforeInversion];
};

export const seperateChordNameAndBassNote = (rawChordName: string): {
  chordName: string,
  bassNote: string | null
} => {
  let chordName: string = rawChordName;

  /*
    6/9 chords need to be handled specifically so that the 9 isn't parsed as a slash chord.
  */
  const isSixNineChord = rawChordName?.includes('6/9');
  const bassNote = isSixNineChord
    ? rawChordName?.split('/')?.[2]
    : rawChordName?.split('/')?.[1];

  if (bassNote) chordName = isSixNineChord
    ? `${rawChordName?.split('/')?.[0]}/${rawChordName?.split('/')?.[1]}`
    : rawChordName?.split('/')?.[0];

  return { chordName, bassNote }
};

export const getRootNoteAndChordTypeFromName = (chordName: string): {
  chordType: string,
  rootNote: string
} => {
  /* 
    Split the chord into root note and chord type either at a space 
    or immediately after the flat/sharp notation.
    Otherwise just split after first character.
  */
  let splitIdx = 0;
  if (chordName.includes(' ')) splitIdx = chordName.indexOf(' ');
  if (chordName?.[1] === '#' || chordName?.[1] === 'b') splitIdx = 1;

  const chordType = chordName?.substring(splitIdx + 1)?.trim();
  const rootNote = chordName?.substring(0, splitIdx + 1)?.trim();

  return { chordType, rootNote }
};

export const getChordNotesFromStructure = (rootNote: string, chordType: string): string[] => {
  /*
    Index and append each matching chord note to the array.
  */
  const rootNoteIdx: number = notes?.indexOf(rootNote);
  const chordNotes: string[] = [];

  const chordStructure = chordStructures[chordType];
  chordStructure?.forEach((n: number) => {
    chordNotes.push(notes[rootNoteIdx + n]);
  });

  return chordNotes;
};

export const checkSubset = (parentArray: string[], subArray: string[]): boolean => {
  return subArray.every((e: string) => {
    return parentArray.includes(e);
  });
};

export const removeDuplicateNotes = (notes: string[]): string[] => {
  return Array.from(new Set(notes));
};
