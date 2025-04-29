# Chord Parser

A small chord parsing library, as the name implies.

## Getting chord notes from a chord name

Use the `getChordNotesByName` function to get an object containing the chord notes and bass note (if it's a slash chord).

```typescript
import { getChordNotesByName } from 'chordparser';

/*
{
  notes: [ 'G', 'C', 'E', 'G', 'B' ],
  bassNote: 'G',
  name: 'Cmaj7',
  inversion: null
}
*/
getChordNotesByName({ name: 'Cmaj7/G' })

/*
{
  notes: [ 'D#', 'G#', 'A#', 'C#' ],
  bassNote: null,
  name: 'D#7sus4',
  inversion: null
}
*/
getChordNotesByName({ name: 'D#7sus4' })

/*
{
  notes: [ 'G', 'G', 'B', 'C', 'E' ],
  bassNote: 'G',
  name: 'Cmaj7',
  inversion: 2
}
*/
getChordNotesByName({ name: 'Cmaj7/G', inversion: 2 }) 
```

## Getting a chord name from a set of notes
Use the `getChordNameFromNotes` function to get an object containing exact and possible matches given a set of notes. 

```typescript

/*
[ 
  { 
     name: 'Cmaj7', 
     notes: [ 'C', 'E', 'G', 'B' ], 
     rootNote: 'C' 
  }
]
*/
getChordNameFromNotes(['C', 'E', 'G', 'B']).exactMatches
```