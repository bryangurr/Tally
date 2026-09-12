import test from 'node:test';
import assert from 'node:assert/strict';
import { adjustTimer, restartTimer } from '../src/timer.js';
const game = { timed: true, finished: false, running: false, seconds: 0, timerDuration: 300, players: [{ score: 12 }], round: 2 };

test('an expired timer restarts at its configured duration without changing scores', () => {
  const next = restartTimer(game);
  assert.equal(next.seconds, 300);
  assert.equal(next.running, true);
  assert.equal(next.players, game.players);
  assert.equal(next.round, 2);
});
test('adjusting time preserves pause state and changes the restart duration', () => {
  const next = adjustTimer(game, '7');
  assert.equal(next.seconds, 420);
  assert.equal(next.running, false);
  assert.equal(restartTimer({ ...next, seconds: 12 }).seconds, 420);
  assert.equal(next.timerRevision, 1);
});
test('invalid durations and finished games cannot be changed', () => {
  for (const minutes of ['', 0, -1, 181, 1.5, 'abc', Infinity]) assert.equal(adjustTimer(game, minutes), game);
  const finished = { ...game, finished: true };
  assert.equal(adjustTimer(finished, 5), finished);
  assert.equal(restartTimer(finished), finished);
});
test('older saved games without an original duration can restart', () => {
  assert.equal(restartTimer({ ...game, timerDuration: undefined }).seconds, 300);
});

test('running timers reject adjustments until paused', () => {
  const running = { ...game, running: true, seconds: 120 };
  assert.equal(adjustTimer(running, 2), running);
  const paused = { ...running, running: false };
  assert.equal(adjustTimer(paused, 3).seconds, 180);
});

test('mixed minutes and seconds persist as the exact restart duration', () => {
  const adjusted = adjustTimer(game, '2', '35');
  assert.equal(adjusted.seconds, 155);
  assert.equal(restartTimer(adjusted).seconds, 155);
  assert.equal(adjustTimer(game, 0, 1).seconds, 1);
  assert.equal(restartTimer(adjustTimer(game, 0, 30)).seconds, 30);
  assert.equal(adjustTimer(game, 180, 0).seconds, 10800);
});
test('invalid seconds and out-of-range totals are rejected', () => {
  for (const [minutes, seconds] of [[0, 0], [1, 60], [1, -1], [1, 1.5], [180, 1], [1, ''], ['', 30], [1, 'abc']]) {
    assert.equal(adjustTimer(game, minutes, seconds), game);
  }
});
