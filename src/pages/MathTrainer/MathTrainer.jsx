import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

const MathTrainer = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateRandomNumber = (digits) => {
    return Math.floor(Math.random() * (Math.pow(10, digits) - 1)) + 1; // Adjusted to exclude 0
  };

  const generateRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const startTimer = () => {
    resetTimer();
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    const newScore = calculateScore();
    setScore(newScore);
  };

  const calculateScore = () => {
    return (score + 1) / seconds;
  };

  const generateNewProblem = () => {
    let newNum1, newNum2, newOperator;

    do {
      newNum1 = generateRandomNumber(3);
      newNum2 = generateRandomNumber(3);
      newOperator = generateRandomOperator();
    } while (newOperator === '/' && newNum1 % newNum2 !== 0); // Ensure division yields a whole number

    setNum1(newNum1);
    setNum2(newNum2);
    setOperator(newOperator);
    setAnswer('');
    setUserInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === answer.toString()) {
      generateNewProblem();
    }
  };

  useEffect(() => {
    switch (operator) {
      case '+':
        setAnswer(num1 + num2);
        break;
      case '-':
        setAnswer(num1 - num2);
        break;
      case '*':
        setAnswer(num1 * num2);
        break;
      case '/':
        setAnswer(num1 / num2);
        break;
      default:
        setAnswer(num1 + num2);
    }
  }, [num1, num2, operator]);

  return (
    <Container>
      <Typography variant="h4">Math Trainer</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Typography variant="h5">
            {num1} {operator} {num2} =
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <TextField
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              label="Answer"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item>
          <Button onClick={generateNewProblem} variant="outlined">
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Typography variant="body1">Timer: {seconds}s</Typography>
        </Grid>
        <Grid item>
          {isActive ? (
            <Button onClick={stopTimer} variant="contained" color="secondary">
              Stop Timer
            </Button>
          ) : (
            <Button onClick={startTimer} variant="contained" color="primary">
              Start Timer
            </Button>
          )}
        </Grid>
        <Grid item>
          <Typography variant="body1">Score: {score.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MathTrainer;
