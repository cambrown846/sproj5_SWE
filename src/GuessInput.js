import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function GuessInput({ allSolutions, foundSolutions, correctAnswerCallback }) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('Make your first guess!');

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = input.trim().toUpperCase();

    if (!guess) return;

    if (foundSolutions.includes(guess)) {
      setFeedback(`${guess} has already been found!`);
    } else if (allSolutions.includes(guess)) {
      setFeedback(`Correct! ${guess} found.`);
      correctAnswerCallback(guess);
    } else {
      setFeedback(`${guess} is incorrect.`);
    }

    setInput('');
  };

  return (
    <div className="GuessInput">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter a word"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '8px' }}>
          Submit
        </Button>
      </form>
      <p>{feedback}</p>
    </div>
  );
}

export default GuessInput;
