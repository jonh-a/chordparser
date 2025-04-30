import { ChordT } from './types';
import { handleInversion, getNotesFromChordType, transposeRootNote } from './util';

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

  public transpose(semitones: number = 0) {
    const transposedRoot = transposeRootNote(this.rootNote, semitones);
    const transposedBass = this.bassNote ? transposeRootNote(this.bassNote, semitones) : null;
    const transposedNotes = handleInversion(
      getNotesFromChordType(transposedRoot, this.chordType), 
      this.inversion,
    );
    if (transposedBass) transposedNotes.unshift(transposedBass);

    return new Chord({
      ...this.opts,
      rootNote: transposedRoot,
      notes: transposedNotes,
      name: `${transposedRoot}${this.chordType}`,
      bassNote: transposedBass,
    });
  } 
}