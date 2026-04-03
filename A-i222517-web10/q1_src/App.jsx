import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './index.css';

const UNIQUE_SIGNALS = ['👽', '🛸', '🌌', '🚀', '🌠', '☄️', '🛰️', '🪐'];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Generate pairs and shuffle
    const pairedSignals = [...UNIQUE_SIGNALS, ...UNIQUE_SIGNALS];
    const shuffledSignals = pairedSignals
      .map(item => ({ signal: item, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledSignals);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setTime(0);
    setIsGameOver(false);
    setGameStarted(false);
  }

  // Timer
  useEffect(() => {
    let timer;
    if (gameStarted && !isGameOver) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isGameOver]);

  // Handle Match/Mismatch
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.signal === secondCard.signal) {
        // match
        setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
        setScore(prev => prev + 100);
        setFlippedCards([]);
      } else {
        // mismatch
        setScore(prev => prev - 10);
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards]);

  // Check Game Over
  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setIsGameOver(true);
      // time bonus: higher bonus for lower time
      const bonus = Math.max(0, 1000 - (time * 10));
      setScore(prev => prev + bonus);
    }
  }, [matchedCards, cards, time]);

  const handleCardClick = (card) => {
    if (!gameStarted) setGameStarted(true);
    // prevent clicking max flipped, already flipped, already matched
    if (flippedCards.length === 2) return;
    if (flippedCards.find(c => c.id === card.id)) return;
    if (matchedCards.includes(card.id)) return;
    
    setFlippedCards(prev => [...prev, card]);
  };

  return (
    <div className="game-container">
      <header>
        <h1>Alien Signal Decryption</h1>
        <div className="stats">
          <span>Score: {score}</span>
          <span>Time: {time}s</span>
        </div>
        <button className="reset-btn" onClick={startNewGame}>Restart Decryption</button>
      </header>
      
      {isGameOver && (
        <div className="game-over-banner">
          <h2>Decryption Complete!</h2>
          <p>Final Score: {score}</p>
        </div>
      )}

      <div className="grid">
        {cards.map(card => {
          const isFlipped = flippedCards.find(c => c.id === card.id);
          const isMatched = matchedCards.includes(card.id);
          return (
            <Card 
              key={card.id} 
              card={card} 
              isRevealed={isFlipped || isMatched} 
              isMatched={isMatched}
              onClick={() => handleCardClick(card)} 
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
