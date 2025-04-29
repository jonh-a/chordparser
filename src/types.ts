export interface ChordName {
  name: string
  inversion?: number | null
  root?: string
}

export interface ChordNotes {
  notes: string[]
  bassNote?: string | null
  name?: string
  inversion?: number | null
  rootNote?: string | null
}