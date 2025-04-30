export interface ChordT {
  name: string
  notes?: string[]
  inversion?: number | null
  rootNote?: string
  bassNote?: string | null
  chordType?: string;
};

export interface ChordType { 
  structure: number[]; 
  key: 'major' | 'minor' | 'neither',
  duplicate?: boolean,
}