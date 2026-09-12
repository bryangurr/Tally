import test from 'node:test';
import assert from 'node:assert/strict';
import { changeScore, advanceRound } from '../src/scoring.js';

const game = (mode, scores, limit = 20) => ({ mode, limit, round: 1, finished: false, players: scores.map((score, i) => ({ name: `Player ${i + 1}`, score })) });

test('round scoring supports penalties without affecting opponents or the undo snapshot', () => {
  const original = game('rounds', [0, 5]);
  const result = changeScore(original, 0, -5);
  assert.deepEqual(result.players.map(p => p.score), [-5, 5]);
  assert.equal(original.players[0].score, 0);
  assert.equal(result.finished, false);
});
test('reaching or passing the target ends a game', () => {
  for (const amount of [1, 5]) assert.equal(changeScore(game('target', [19, 10]), 0, amount).finished, true);
  assert.equal(changeScore(game('target', [18, 10]), 0, 1).finished, false);
});
test('life cannot fall below zero and the last surviving player wins', () => {
  const result = changeScore(game('life', [3, 20]), 0, -10);
  assert.equal(result.players[0].score, 0);
  assert.equal(result.finished, true);
  assert.equal(changeScore(game('life', [3, 20, 15]), 0, -10).finished, false);
});
test('a round game only ends after its final round is scored', () => {
  let current = game('rounds', [10, 20], 2);
  current = advanceRound(current);
  assert.equal(current.round, 2);
  assert.equal(current.finished, false);
  current = advanceRound(current);
  assert.equal(current.round, 2);
  assert.equal(current.finished, true);
});
test('completed games are protected against further score and round changes', () => {
  const completed = { ...game('target', [20, 10]), finished: true };
  assert.equal(changeScore(completed, 1, 10), completed);
  assert.equal(advanceRound(completed), completed);
});
