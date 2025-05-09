import { ChordT } from './types';
import {
  handleInversion,
  getNotesFromChordType,
  transposeRootNote,
  generateAllPossibleChordsFromRootNote,
  doesArrayContainSubset,
} from './util';

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
    this.chordType = opts?.chordType;
    this.inversion = opts?.inversion || null;
    Object.defineProperty(this, 'opts', {
      value: opts,
      writable: true,
      configurable: true,
      enumerable: false,
    });
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

    const transposedName = `${transposedRoot}${this.chordType}`
      + `${transposedBass ? '/' + transposedBass : ''}`;

    return new Chord({
      ...this.opts,
      rootNote: transposedRoot,
      notes: transposedNotes,
      name: transposedName,
      bassNote: transposedBass,
    });
  }

  public extensions() {
    return generateAllPossibleChordsFromRootNote(this.rootNote)
      .filter((chord: Chord) => doesArrayContainSubset(chord.notes, this.notes));
  }

  public subsets() {
    return generateAllPossibleChordsFromRootNote(this.rootNote)
      .filter((chord: Chord) => doesArrayContainSubset(this.notes, chord.notes));
  }
}

export const constructChord = (chord: ChordT): Chord => {
  return new Chord({
    name: chord.name,
    notes: chord.notes,
    rootNote: chord.rootNote,
    bassNote: chord?.bassNote ?? null,
    chordType: chord.chordType,
    inversion: chord?.inversion ?? null,
  });
};