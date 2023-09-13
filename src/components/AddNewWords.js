import React, { useState } from 'react';
import '../styles/AddNewWords.css'

const AddNewWords = ({ addPair }) => {
  const [languageA, setLanguageA] = useState('');
  const [languageB, setLanguageB] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pairAdded, setPairAdded] = useState(false);

  const handleAddPair = () => {
    if (languageA && languageB) {
      const pair = { source: languageA, target: languageB };
      addPair(pair);
      setLanguageA('');
      setLanguageB('');
      setErrorMessage(''); // Clear the error message if both fields are filled
      setPairAdded(true)
    } else {
      setPairAdded(false)
      setErrorMessage('Please fill out both source and target languages.');
    }
  };

  return (
    <div id="add-new">
      <h4>Add new words to your list</h4>
      <form autoComplete="off" className='form-add-new'>
        <label>
        Source language:
          <input type="text" id="new-input-source" value={languageA} onChange={(e) => setLanguageA(e.target.value)} />
        </label>
      </form>
      <form autoComplete="off" className='form-add-new'>
        <label>
        Target language:
          <input type="text" id="new-input-target" value={languageB} onChange={(e) => setLanguageB(e.target.value)} />
        </label>
      </form>
      <button id="add-new-button" onClick={handleAddPair}>Add words</button>
      <div className="conditional-content">
        {pairAdded && <p className="message success">New pair added.</p>}
        {errorMessage && <p className="message error">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddNewWords;
