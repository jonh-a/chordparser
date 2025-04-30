import { ChordType } from './types';

export const notesAsSharps = 'A A# B C C# D D# E F F# G G# '.repeat(3).split(' ');
export const notesAsFlats = 'A Bb B C Db D Eb E F Gb G Ab '.repeat(3).split(' ');

export const chordTypes: {
  [index: string]: ChordType
} = {
  // triads
  'maj': { structure: [0, 4, 7], key: 'major', duplicate: true },
  '(b5)': { structure: [0, 4, 6], key: 'neither' },
  '': { structure: [0, 4, 7], key: 'major' },
  'min': { structure: [0, 3, 7], key: 'minor', duplicate: true },
  'm': { structure: [0, 3, 7], key: 'minor' },
  '5': { structure: [0, 7], key: 'neither' },
  'sus2': { structure: [0, 2, 7], key: 'major' },
  'sus4': { structure: [0, 5, 7], key: 'major' },
  'dim': { structure: [0, 3, 6], key: 'minor' },
  'aug': { structure: [0, 4, 8], key: 'major' },
  '+': { structure: [0, 4, 8], key: 'major', duplicate: true },

  // tetrads
  '6': { structure: [0, 4, 7, 9], key: 'major' },
  'm6': { structure: [0, 3, 7, 9], key: 'minor' },
  'min6': { structure: [0, 3, 7, 9], key: 'minor', duplicate: true },
  '7': { structure: [0, 4, 7, 10], key: 'major' },
  '7sus4': { structure: [0, 5, 7, 10], key: 'major' },
  'maj7': { structure: [0, 4, 7, 11], key: 'major' },
  'min7': { structure: [0, 3, 7, 10], key: 'minor', duplicate: true },
  'm7': { structure: [0, 3, 7, 10], key: 'minor' },
  'm7b5': { structure: [0, 3, 6, 10], key: 'minor' },
  'min7b5': { structure: [0, 3, 6, 10], key: 'minor', duplicate: true },
  'dim7': { structure: [0, 3, 6, 9], key: 'minor' },
  'add9': { structure: [0, 4, 7, 14], key: 'major' },
  'addb9': { structure: [0, 4, 7, 13], key: 'major' },
  '(add9)': { structure: [0, 4, 7, 14], key: 'major', duplicate: true },
  '(addb9)': { structure: [0, 4, 7, 13], key: 'major', duplicate: true },
  'madd9': { structure: [0, 3, 7, 14], key: 'minor' },
  'm(add9)': { structure: [0, 3, 7, 14], key: 'minor', duplicate: true },
  'mmaj7': { structure: [0, 3, 7, 11], key: 'minor' },

  // extended chords
  '6/9': { structure: [0, 4, 7, 9, 14], key: 'major' },
  'm6/9': { structure: [0, 3, 7, 9, 14], key: 'minor' },
  'min6/9': { structure: [0, 3, 7, 9, 14], key: 'minor', duplicate: true },

  '9': { structure: [0, 4, 7, 10, 14], key: 'major' },
  '9sus4': { structure: [0, 5, 7, 10, 14], key: 'major' },
  'maj9': { structure: [0, 4, 7, 11, 14], key: 'major' },
  'min9': { structure: [0, 3, 7, 10, 14], key: 'minor', duplicate: true },
  'm9': { structure: [0, 3, 7, 10, 14], key: 'minor' },

  '11': { structure: [0, 4, 7, 10, 14, 17], key: 'major' },
  'maj11': { structure: [0, 4, 7, 11, 14, 17], key: 'major' },
  'm11': { structure: [0, 3, 7, 11, 14, 17], key: 'minor' },
  'min11': { structure: [0, 4, 7, 11, 14, 17], key: 'minor', duplicate: true },
  'maj7#11': { structure: [0, 4, 7, 11, 18], key: 'major' },

  '13': { structure: [0, 4, 7, 10, 14, 17, 21], key: 'major' },
  '13sus4': { structure: [0, 5, 7, 10, 14, 17, 21], key: 'major' },
  'maj13': { structure: [0, 4, 7, 11, 14, 17, 21], key: 'major' },
  'm13': { structure: [0, 3, 7, 11, 14, 17, 21], key: 'minor' },
  'min13': { structure: [0, 4, 7, 11, 14, 17, 21], key: 'minor', duplicate: true },
};

export const getNotesInScale = (
  rootNote: string,
  chordType: string,
): { notes: string[]; scale: 'flats' | 'sharps' } => {
  const sharps = ['F#', 'C#', 'G#', 'D#', 'A#'];
  const flats = ['Gb', 'Db', 'Ab', 'Eb', 'Bb'];

  const majorSharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
  const majorFlatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];

  const minorSharpKeys = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'];
  const minorFlatKeys = ['D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab'];

  const chordKey = chordTypes[chordType]?.key;

  if (sharps.includes(rootNote)) {
    return { notes: notesAsSharps, scale: 'sharps' };
  }

  if (flats.includes(rootNote)) {
    return { notes: notesAsFlats, scale: 'flats' };
  }

  if (['major', 'neither'].includes(chordKey)) {
    if (majorSharpKeys.includes(rootNote)) {
      return { notes: notesAsSharps, scale: 'sharps' };
    }
    if (majorFlatKeys.includes(rootNote)) {
      return { notes: notesAsFlats, scale: 'flats' };
    }
  }

  if (chordKey === 'minor') {
    if (minorSharpKeys.includes(rootNote)) {
      return { notes: notesAsSharps, scale: 'sharps' };
    }
    if (minorFlatKeys.includes(rootNote)) {
      return { notes: notesAsFlats, scale: 'flats' };
    }
  }

  return { notes: notesAsSharps, scale: 'sharps' };
};

export const changeAccidential = (note: string, changeTo: 'sharps' | 'flats') => {
  const sharpReplacements = {
    Bb: 'A#',
    Db: 'C#',
    Eb: 'D#',
    Gb: 'F#',
    Ab: 'G#',
  };

  const flatReplacements = {
    'A#': 'Bb',
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
  };

  const replacements = changeTo === 'sharps' 
    ? sharpReplacements 
    : flatReplacements;
  
  for (const [original, replacement] of Object.entries(replacements)) {
    if (note?.startsWith(original)) {
      return note?.replace(original, replacement);
    }
  }

  return note;
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

  return { chordName, bassNote };
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

  return { chordType, rootNote };
};

export const getNotesFromChordType = (rootNote: string, chordType: string): string[] => {
  const { notes } = getNotesInScale(rootNote, chordType);
  const rootNoteIdx: number = notes?.indexOf(rootNote);
  const chordStructure = chordTypes[chordType].structure;

  return chordStructure.map((n: number) => {
    return notes[rootNoteIdx + n];
  });
};

export const checkSubset = (parentArray: string[], subArray: string[]): boolean => {
  return subArray.every((e: string) => {
    return parentArray.includes(e);
  });
};

export const removeDuplicateNotes = (notes: string[]): string[] => {
  return Array.from(new Set(notes));
};
