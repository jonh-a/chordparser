export interface Chord {
  name: string
  notes?: string[]
  inversion?: number | null
  rootNote?: string
  bassNote?: string | null
};

export interface ChordType { 
  structure: number[]; 
  key: 'major' | 'minor' | 'neither',
  duplicate?: boolean,
}