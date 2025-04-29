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
  return str
}

export const swapSharpsWithFlats = (str: string) => {
  if (str?.startsWith("A#")) return str.replace('A#', 'Bb');
  if (str?.startsWith("C#")) return str.replace('C#', 'Db');
  if (str?.startsWith("D#")) return str.replace('D#', 'Eb');
  if (str?.startsWith("F#")) return str.replace('F#', 'Gb');
  if (str?.startsWith("G#")) return str.replace('G#', 'Ab');
  return str
}