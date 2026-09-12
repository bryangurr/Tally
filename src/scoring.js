export function changeScore(game, index, amount) {
  if (game.finished) return game;
  const players = game.players.map((player, i) => i === index
    ? { ...player, score: game.mode === 'life' ? Math.max(0, player.score + amount) : player.score + amount }
    : player);
  const finished = game.mode === 'target'
    ? players.some(player => player.score >= game.limit)
    : game.mode === 'life'
      ? players.filter(player => player.score > 0).length <= 1
      : false;
  return { ...game, players, finished };
}

export function advanceRound(game) {
  if (game.finished) return game;
  return { ...game, round: Math.min(game.round + 1, game.limit), finished: game.round >= game.limit };
}
