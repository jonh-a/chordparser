import { ChordT } from './types';

export class Chord {
  name: string;
  notes: string[];
  rootNote: string;
  bassNote: string | null;
  chordType: string;
  inversion: number | null;

  constructor(opts: ChordT) {
    this.name = opts.name;
    this.notes = opts.notes;
    this.rootNote = opts.rootNote;
    this.bassNote = opts?.bassNote || null;
    this.chordType = opts?.chordType || null;
    this.inversion = opts?.inversion || null;
  }
}