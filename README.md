# Chord Parser

A small chord parsing library, as the name implies.

## Getting chord by name/notation

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

## Getting a chord from a set of notes

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
getChordByNotes(["G", "C", "E", "G", "B"]).exactMatches;

/*
[
  Chord {
    name: 'D#add9/G',
    notes: [ 'G', 'D#', 'A#', 'F' ],
    rootNote: 'D#',
    bassNote: 'G',
    chordType: 'add9',
    inversion: null
  }
]
*/
getChordByNotes(["G", "A#", "D#", "F"]).exactMatches;
```

## Getting a chord from a guitar voicing

Use the `getChordByGuitarVoicing` function to get an object containing exact and
possible matches given a set of notes.

```typescript
import { getChordByGuitarVoicing } from "chordparser";

/*
[
  Chord {
    name: 'Em',
    notes: [ 'E', 'G', 'B' ],
    rootNote: 'E',
    bassNote: null,
    chordType: 'm',
    inversion: null
  }
]
*/
getChordByGuitarVoicing([0, 2, 2, 0, 0, 0]).exactMatches;

/*
[
  Chord {
    name: 'Cadd9',
    notes: [ 'C', 'E', 'G', 'D' ],
    rootNote: 'C',
    bassNote: null,
    chordType: 'add9',
    inversion: null
  }
]
*/
getChordByGuitarVoicing([null, 3, 2, 0, 3, null]).exactMatches;

/*
[
  Chord {
    name: 'Gadd9',
    notes: [ 'G', 'B', 'D', 'A' ],
    rootNote: 'G',
    bassNote: null,
    chordType: 'add9',
    inversion: null
  }
]
*/
getChordByGuitarVoicing({
  tuning: ["D", "A", "D", "G", "A", "D"],
  notes: [5, 5, 0, 4, 0, 5],
}).exactMatches;
```
