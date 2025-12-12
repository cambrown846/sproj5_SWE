import React, { useState } from 'react';
import { Button, FormControl, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import { GAME_STATE } from './GameState.js';

function ToggleGameState({ gameState, setGameState, setSize, setTotalTime, size }) {
  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);

  function updateGameState(endTime) {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      const deltaTime = (endTime - startTime) / 1000.0;
      setTotalTime(deltaTime);
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
  }

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <Box className="Toggle-game-state" sx={{ mt: 2 }}>
      <Button variant="outlined" onClick={() => updateGameState(Date.now())}>
        {buttonText}
      </Button>

      {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) && (
        <Box sx={{ mt: 2 }}>
          <FormControl>
            <Select value={size} onChange={handleChange}>
              {[...Array(8)].map((_, i) => {
                const val = i + 3;
                return <MenuItem key={val} value={val}>{val}</MenuItem>;
              })}
            </Select>
            <FormHelperText>Set Grid Size</FormHelperText>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}

export default ToggleGameState;