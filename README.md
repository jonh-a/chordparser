# Chord Parser

A small chord parsing library, as the name implies.

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