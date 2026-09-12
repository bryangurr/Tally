export function parseTimerDuration(minutes, seconds = 0) {
  if (String(minutes).trim() === '' || String(seconds).trim() === '') return null;
  const m = Number(minutes), s = Number(seconds);
  const total = m * 60 + s;
  return Number.isInteger(m) && Number.isInteger(s) && m >= 0 && s >= 0 && s <= 59 && total >= 1 && total <= 10800 ? total : null;
}

export function timerDuration(game) {
  return Number.isInteger(game.timerDuration) && game.timerDuration >= 1 && game.timerDuration <= 10800
    ? game.timerDuration : 300;
}

export function adjustTimer(game, minutes, seconds = 0) {
  const duration = parseTimerDuration(minutes, seconds);
  if (!game.timed || game.finished || game.running || duration === null) return game;
  return { ...game, timerDuration: duration, seconds: duration, timerRevision: (game.timerRevision || 0) + 1 };
}

export function restartTimer(game) {
  if (!game.timed || game.finished) return game;
  return { ...game, seconds: timerDuration(game), running: true, timerRevision: (game.timerRevision || 0) + 1 };
}
