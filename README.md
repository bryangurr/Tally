# Tally

A mobile-first React scorekeeper for game night, styled with Tailwind CSS and a white, navy, and citrus palette.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` for a production build and `npm test` for scoring tests.

## Three screens

1. **Home:** start a new game or resume the saved game.
2. **Setup:** choose round-based scoring, a target score, or life totals; name 2–6 players; set the goal and optional game timer.
3. **Game:** adjust scores by 1, 5, or 10, undo changes, advance rounds, and see the winner inline.

Games save automatically in this browser’s local storage. Returning home pauses the timer; resuming the game continues it. Timer expiry is a reminder and does not end the game. Undo history lasts for the current session and includes the last 100 score or round changes. Starting another game replaces the saved game. No account or backend is required.
