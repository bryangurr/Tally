import React from 'react';
import { ArrowUpRight, ArrowRight, Plus, Layers3 } from 'lucide-react';

export default function Home({ game, setScreen }) {
  return <div className="home-screen screen-enter">
        <div className="hero-copy"><h1>Less counting.<br/>More <span className="highlight-word">playing.<svg viewBox="0 0 310 16" preserveAspectRatio="none"><path d="M3 10 Q140 -2 305 7 M20 14 Q160 6 291 12"/></svg></span></h1><button className="primary new-game" onClick={() => setScreen('setup')}><Plus size={23}/><span>New game</span><ArrowUpRight size={23}/></button>{game && <button className="resume-button" onClick={() => setScreen('game')}><span>Resume Game</span><ArrowRight size={23}/></button>}</div>
        <div className="hero-art" aria-label="Illustration of a game scoreboard with Alex at 24 points and Jamie at 18 points"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✧</span><div className="playing-card card-back"><span>♧</span></div><div className="playing-card card-front"><span>A<small>♠</small></span><b>♠</b><span className="card-corner">A<small>♠</small></span></div><div className="demo-board"><div className="demo-round">Round 3 <span>/ 5</span><Layers3 size={17}/></div><div className="demo-player lavender"><span className="demo-avatar">A</span><span>Alex</span><strong>24</strong></div><div className="demo-player peach"><span className="demo-avatar">J</span><span>Jamie</span><strong>18</strong></div></div><div className="dice"><i/><i/><i/><i/><i/></div></div>

      </div>;
}
