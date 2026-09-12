import React, { useState } from 'react';
import { Timer, Pause, Play, RotateCcw, Settings2 } from 'lucide-react';
import { adjustTimer, restartTimer, timerDuration, parseTimerDuration } from './timer.js';

export default function TimerControls({ game, setGame }) {
  const [editing, setEditing] = useState(false);
  const [minutes, setMinutes] = useState(() => Math.floor(timerDuration(game) / 60));
  const [seconds, setSeconds] = useState(() => timerDuration(game) % 60);
  const [error, setError] = useState('');

  function apply(event) {
    event.preventDefault();
    if (parseTimerDuration(minutes, seconds) === null) {
      setError('Enter a time from 0:01 to 180:00, with seconds from 0 to 59.');
      return;
    }
    setGame(g => adjustTimer(g, minutes, seconds));
    setEditing(false);
    setError('');
  }

  return <div className="timer-panel">
    <div className={`timer-display ${game.seconds === 0 ? 'expired' : ''}`}>
      <Timer size={20}/>
      <span aria-live="off">{Math.floor(game.seconds / 60).toString().padStart(2, '0')}:{(game.seconds % 60).toString().padStart(2, '0')}</span>
      <button aria-label={game.running && !game.finished ? 'Pause timer' : 'Resume timer'} disabled={game.seconds === 0 || game.finished} onClick={() => { setEditing(false); setGame(g => ({ ...g, running: !g.running })); }}>
        {game.running && !game.finished ? <Pause size={17}/> : <Play size={17}/>}
      </button>
      <button aria-label="Restart timer" title="Restart timer" disabled={game.finished} onClick={() => { setEditing(false); setGame(restartTimer); }}><RotateCcw size={17}/></button>
      <button disabled={game.finished || game.running} aria-label="Timer options" title={game.running ? 'Pause timer to adjust' : 'Timer options'} aria-expanded={editing && !game.running && !game.finished} aria-controls="timer-adjustment" onClick={() => { setMinutes(Math.floor(timerDuration(game) / 60)); setSeconds(timerDuration(game) % 60); setError(''); setEditing(v => !v); }}><Settings2 size={17}/></button>
    </div>
    {editing && !game.finished && !game.running && <form id="timer-adjustment" className="timer-adjustment" onSubmit={apply}>
      <div className="timer-adjustment-label">Set remaining time</div>
      <div className="timer-adjustment-row">
        <label>Minutes<input id="timer-minutes" type="number" min="0" max="180" step="1" required value={minutes} onChange={e => setMinutes(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'timer-error' : undefined}/></label>
        <label>Seconds<input id="timer-adjust-seconds" type="number" min="0" max="59" step="1" required value={seconds} onChange={e => setSeconds(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'timer-error' : undefined}/></label>
        <button type="submit">Apply</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </div>
      {error && <p id="timer-error" role="alert">{error}</p>}
    </form>}
  </div>;
}
