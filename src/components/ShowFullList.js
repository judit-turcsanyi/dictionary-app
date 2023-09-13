import React from 'react';
import '../styles/ShowFullList.css'
import EmptyListMessage from './EmptyListMessage.js'

const ShowFullList = ({ pairs, removePair }) => {
  const handleRemovePair = (pair) => {
    removePair(pair);
  };

  return (
    <div>
      <ul id='full-list'>
        {pairs.length === 0 && (<EmptyListMessage />)}
        {pairs.map((pair, index,) => (
          <div key={index} id="fulllist-item">
            <li key={index}>
              {pair.source} - {pair.target}
            </li>
            <button 
              id="delete-from-list-button"
              onClick={() => handleRemovePair(pair)}
            >
              X</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShowFullList;
