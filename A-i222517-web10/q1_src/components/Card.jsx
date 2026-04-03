import React from 'react';

const Card = ({ card, isRevealed, isMatched, onClick }) => {
  return (
    <div 
      className={`card ${isRevealed ? 'revealed' : 'hidden'} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        {isRevealed ? card.signal : ''}
      </div>
    </div>
  );
};

export default Card;
