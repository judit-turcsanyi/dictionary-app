import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddNewWords from './components/AddNewWords';
import Quiz from './components/Quiz';
import ShowFullList from './components/ShowFullList';

function App() {
  const [pairs, setPairs] = useState([]);
  const apiUrl = 'http://dictservice.eba-2nd6frjp.eu-north-1.elasticbeanstalk.com';

  useEffect(() => {
    // Load language pairs from the backend server when the component mounts
    fetch(`${apiUrl}/list`)
      .then((response) => response.json())
      .then((data) => setPairs(data))
      .catch((error) => console.error('Error loading language pairs:', error));
  }, []);

  const addPair = (pair) => {
    // Send a POST request to the backend server to add a new language pair
    fetch(`${apiUrl}/add/${pair.source}/${pair.target}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setPairs([...pairs, data[0]]);
        console.log(data)
      })
      .catch((error) => console.error('Error adding language pair:', error));
  };

  const removePair = (pairToRemove) => {
    // Filter the pairs to remove the selected pair
    const updatedPairs = pairs.filter((pair) => pair !== pairToRemove);
    setPairs(updatedPairs);

    fetch(`${apiUrl}/delete/${pairToRemove.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error deleting language pair:', error));
  };

  return (
    <Router>
    <div className="App">
      <NavBar />
      <div className="content">
          <Routes>
            <Route path="/add" element={<AddNewWords addPair={addPair} />} />
            <Route path="/quiz" element={<Quiz pairs={pairs} removePair={removePair} />} />
            <Route path="/list" element={<ShowFullList pairs={pairs} removePair={removePair} />} />
          </Routes>
        </div>
    </div>
  </Router>
  );
}

export default App;
