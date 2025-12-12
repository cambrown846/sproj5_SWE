import React, { useState, useEffect, useMemo } from 'react';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import { GAME_STATE } from './GameState.js';
import obj from './Boggle_Solutions_Endpoint.json';
import './App.css';
import logo from './logo.png';

function App() {
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [size, setSize] = useState(3);
  const [game, setGame] = useState({});

  // Map of size → challenge
  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]);

  // Populate solutions when game changes
  useEffect(() => {
    if (game && game.solutions) {
      setAllSolutions(game.solutions);
    }
  }, [game]);

  // Load local predefined game (offline mode)
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      const g = myMap.get(size.toString());
      if (g) {
        setGame(g);
        setGrid(g.grid);
        setFoundSolutions([]);
      }
    }
  }, [gameState, size, myMap]);

  function correctAnswerFound(answer) {
    if (!foundSolutions.includes(answer)) {
      setFoundSolutions([...foundSolutions, answer]);
    }
  }

  return (
    <div className="App">
      <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />

      <ToggleGameState
        gameState={gameState}
        setGameState={setGameState}
        setSize={setSize}
        setTotalTime={setTotalTime}
        size={size}
      />

      {gameState !== GAME_STATE.BEFORE && grid.length > 0 && (
        <div>
          <Board board={grid} />
          <GuessInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={correctAnswerFound}
          />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <FoundSolutions words={foundSolutions} headerText="Words Found" />
        </div>
      )}
    </div>
  );
}

export default App;