# Chord Parser

A small chord parsing library, as the name implies.

## Getting chord notes from a chord name

Use the `getChordByName` function to get an object containing the chord notes
and bass note (if it's a slash chord).

```typescript
import { getChordByName } from "chordparser";

/*
Chord {
  name: 'Cmaj7',
  notes: [ 'G', 'C', 'E', 'G', 'B' ],
  rootNote: 'C',
  bassNote: 'G',
  chordType: 'maj7',
  inversion: null
}
*/
getChordByName("Cmaj7/G");

/*
Chord {
  name: 'D#7sus4',
  notes: [ 'D#', 'G#', 'A#', 'C#' ],
  rootNote: 'D#',
  bassNote: null,
  chordType: '7sus4',
  inversion: null
}
*/
getChordByName("D#7sus4");

/*
Chord {
  name: 'Cmaj7',
  notes: [ 'G', 'G', 'B', 'C', 'E' ],
  rootNote: 'C',
  bassNote: 'G',
  chordType: 'maj7',
  inversion: 2
}
*/
getChordByName({ name: "Cmaj7/G", inversion: 2 });
```

## Getting a chord name from a set of notes

Use the `getChordByNotes` function to get an object containing exact and
possible matches given a set of notes.

```typescript
import { getChordByNotes } from "chordparser";

/*
[
  Chord {
    name: 'Cmaj7',
    notes: [ 'C', 'E', 'G', 'B' ],
    rootNote: 'C',
    bassNote: null,
    chordType: 'maj7',
    inversion: null
  }
]
*/
getChordByNotes(["C", "E", "G", "B"]).exactMatches;
```
