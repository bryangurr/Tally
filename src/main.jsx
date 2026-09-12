import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Flag, Heart, Layers3, House, X } from 'lucide-react';
import Home from './Home.jsx';
import Setup from './Setup.jsx';
import Game from './Game.jsx';
import './styles.css';
import { parseTimerDuration } from './timer.js';
import { changeScore, advanceRound } from './scoring.js';

const modes = [
  { id: 'rounds', name: 'Round by round', short: 'Round-based', text: 'Play your rounds. Highest score wins.', icon: Layers3, label: 'Number of rounds', initial: 5 },
  { id: 'target', name: 'Race to the finish', short: 'Target score', text: 'First to the target takes the win.', icon: Flag, label: 'Target score', initial: 100 },
  { id: 'life', name: 'Last one standing', short: 'Life totals', text: 'Track your life. Make every point count.', icon: Heart, label: 'Starting life', initial: 20 },
];
const colors = ['lavender', 'peach', 'mint', 'blue', 'rose', 'sand'];
const readSaved = () => { try { const value = JSON.parse(localStorage.getItem('tally-game')); return value && modes.some(m => m.id === value.mode) && Array.isArray(value.players) && value.players.length >= 2 && value.players.every(p => typeof p.name === 'string' && Number.isFinite(p.score)) && Number.isFinite(value.limit) && Number.isFinite(value.seconds) ? value : null; } catch { return null; } };

function Brand({ onClick }) { return <button className="brand" onClick={onClick} aria-label="Tally home"><span className="brand-mark"><i/><i/><i/><i/><b/></span>tally<span className="brand-dot">.</span></button>; }
function App() {
  const [screen, setScreen] = useState('home');
  const [game, setGame] = useState(readSaved);
  const [mode, setMode] = useState('rounds');
  const [limit, setLimit] = useState(5);
  const [names, setNames] = useState(['Player 1', 'Player 2']);
  const [timed, setTimed] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [notice, setNotice] = useState('');
  const selected = modes.find(m => m.id === mode);
  useEffect(() => { try { if (game) localStorage.setItem('tally-game', JSON.stringify(game)); } catch { /* Gameplay remains available if storage is disabled. */ } }, [game]);
  useEffect(() => { if (screen !== 'game' || !game?.running || game?.finished || game.seconds <= 0) return; const id = setInterval(() => setGame(g => ({ ...g, seconds: Math.max(0, g.seconds - 1), running: g.seconds > 1 })), 1000); return () => clearInterval(id); }, [screen, game?.running, game?.finished, game?.seconds <= 0, game?.timerRevision]);
  useEffect(() => { window.scrollTo(0, 0); }, [screen]);
  useEffect(() => { if (!notice) return; const id = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(id); }, [notice]);
  function startGame() {
    const duration = parseTimerDuration(minutes, timerSeconds);
    if (!Number.isInteger(Number(limit)) || Number(limit) < 1 || Number(limit) > 9999 || (timed && duration === null)) { setNotice('Enter a valid goal and a timer between 0:01 and 180:00 (seconds must be 0–59).'); return; }
    setGame({ mode, limit: Number(limit), players: names.map((name, i) => ({ name: name.trim() || `Player ${i + 1}`, score: mode === 'life' ? Number(limit) : 0 })), round: 1, timed, timerDuration: duration, seconds: duration ?? 0, running: timed, finished: false }); setHistory([]); setStep(1); setScreen('game');
  }
  function updateScore(index, amount) {
    if (game.finished) return;
    setHistory(h => [...h.slice(-99), { players: game.players, round: game.round, finished: game.finished }]);
    setGame(g => changeScore(g, index, amount));
  }
  function nextRound() { setHistory(h => [...h.slice(-99), { players: game.players, round: game.round, finished: game.finished }]); setGame(advanceRound); }
  function undo() { const previous = history.at(-1); if (!previous) return; setGame(g => ({ ...g, ...previous })); setHistory(h => h.slice(0, -1)); }
  const currentMode = game && modes.find(m => m.id === game.mode);
  const topScore = game ? Math.max(...game.players.map(p => p.score)) : 0;
  const winners = game?.players.filter(p => p.score === topScore);
  return <div className="app-shell">
    <header className="site-header"><Brand onClick={() => setScreen('home')} /><button className={`home-button ${screen === 'home' ? 'is-home' : ''}`} aria-label="Go to home" onClick={() => setScreen('home')}><House size={19}/><span>Home</span></button></header>
    <main>
      {screen === 'home' && <Home game={game} setScreen={setScreen}/>}
      {screen === 'setup' && <Setup modes={modes} colors={colors} mode={mode} setMode={setMode} limit={limit} setLimit={setLimit} names={names} setNames={setNames} timed={timed} setTimed={setTimed} minutes={minutes} setMinutes={setMinutes} timerSeconds={timerSeconds} setTimerSeconds={setTimerSeconds} selected={selected} setScreen={setScreen} startGame={startGame}/>}
      {screen === 'game' && game && <Game colors={colors} game={game} setGame={setGame} currentMode={currentMode} topScore={topScore} winners={winners} step={step} setStep={setStep} history={history} setScreen={setScreen} updateScore={updateScore} nextRound={nextRound} undo={undo}/>}
    </main>
    {notice && <div className="toast" role="alert">{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={16}/></button></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
