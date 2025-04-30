import { ChordT } from './types';
import { handleInversion, getNotesFromChordType } from './util';

export class Chord {
  name: string;
  notes: string[];
  rootNote: string;
  bassNote: string | null;
  chordType: string;
  inversion: number | null;
  private opts: ChordT;

  constructor(opts: ChordT) {
    this.name = opts.name;
    this.notes = opts.notes;
    this.rootNote = opts.rootNote;
    this.bassNote = opts?.bassNote || null;
    this.chordType = opts?.chordType || null;
    this.inversion = opts?.inversion || null;
    this.opts = opts;
  }

  public invert(inversion: number = 0) {
    return new Chord({
      ...this.opts,
      inversion,
      notes: handleInversion(
        getNotesFromChordType(this.rootNote, this.chordType), 
        inversion,
      ),
    });
  }
}