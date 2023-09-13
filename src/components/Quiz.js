import React, { useState } from 'react';
import '../styles/Quiz.css'
import EmptyListMessage from './EmptyListMessage.js';
import classNames from 'classnames';

const Quiz = ({ pairs, removePair }) => {
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * pairs.length));
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleRandomExpression = () => {
    const newIndex = Math.floor(Math.random() * pairs.length);
    setRandomIndex(newIndex);
    console.log('new index: ' + newIndex)
    setUserGuess('');
    console.log('user guess: ' + userGuess)
    setIsCorrect(null);
  };

const checkGuess = (e) => {
  if (pairs.length === 0) {
    return
  }
  e.preventDefault()
    if (pairs[randomIndex].source === userGuess) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleKeys = (e) => {
    if (e.key === 'Enter') {
      checkGuess(e)
    }
  }

  const handleRemovePair = (pair) => {
    removePair(pair);
    handleRandomExpression()
  };

  const resultClass = classNames({
    'message': true,
    'success': isCorrect,
    'error': !isCorrect
  })

  return (
    <div id="quiz">
      {pairs.length === 0 && (<EmptyListMessage />)}
      {pairs.length > 0 && (
        <>
          <button id="show-random-button" onClick={handleRandomExpression}>Show new word</button>
          <div className="conditional-content">
            {pairs[randomIndex] !== undefined && (<p id="random-word">{pairs[randomIndex].target}</p>)}
          </div>
          <form autoComplete="off">
            <label>
              Enter your quess:
              <input 
              type="text" 
              id="guess-input" 
              value={userGuess} 
              onChange={(e) => setUserGuess(e.target.value)} 
              onKeyDown={handleKeys} />
            </label>
          <button id="guess-button" onClick={checkGuess}>Guess</button>
          </form>
      <div className="conditional-content">
      {isCorrect !== null && (
        <>
          <p className={resultClass} id="result">
            {isCorrect
              ? 'Correct!'
              : `Incorrect. The correct answer is: ${pairs[randomIndex].source}`}
          </p>
          {isCorrect
            ? <button id="delete-button" onClick={() => handleRemovePair(pairs[randomIndex])}>Remove from list</button>
            : null
          }
        </>
        )}
        </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
