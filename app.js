// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameLength, setGameLength] = useState(0);
  const [numPeriods, setNumPeriods] = useState(2); // halves by default
  const [numPlayers, setNumPlayers] = useState(0);
  const [numPlayersOnField, setNumPlayersOnField] = useState(0);
  const [subPeriod, setSubPeriod] = useState(0);
  const [fairness, setFairness] = useState(5);
  const [players, setPlayers] = useState([]);
  const [subOrder, setSubOrder] = useState([]);

  const handleAddPlayer = () => {
    setPlayers([...players, { name: '', number: '', rating: 5 }]);
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const calculateSubs = () => {
    const totalPlayTime = gameLength * 60; // convert minutes to seconds
    const periodTime = totalPlayTime / numPeriods;
    const subIntervals = Math.floor(periodTime / subPeriod);
    const subs = [];

    const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

    for (let i = 0; i < subIntervals; i++) {
      const onField = [];
      const offField = [];

      // Determine players on the field for this substitution period
      for (let j = 0; j < numPlayersOnField; j++) {
        const index = (i + j) % sortedPlayers.length;
        onField.push(sortedPlayers[index]);
      }

      // Determine players off the field
      sortedPlayers.forEach(player => {
        if (!onField.includes(player)) {
          offField.push(player);
        }
      });

      subs.push({
        period: i + 1,
        onField: [...onField],
        offField: [...offField]
      });
    }

    setSubOrder(subs);
  };

  return (
    <div className="App">
      <h1>Substitution Calculator</h1>

      <label>
        Length of Game (minutes):
        <input
          type="number"
          value={gameLength}
          onChange={(e) => setGameLength(e.target.value)}
        />
      </label>

      <label>
        Number of Periods:
        <input
          type="number"
          value={numPeriods}
          onChange={(e) => setNumPeriods(e.target.value)}
        />
      </label>

      <label>
        Number of Players on Team:
        <input
          type="number"
          value={numPlayers}
          onChange={(e) => setNumPlayers(e.target.value)}
        />
      </label>

      <label>
        Number of Players on the Field:
        <input
          type="number"
          value={numPlayersOnField}
          onChange={(e) => setNumPlayersOnField(e.target.value)}
        />
      </label>

      <label>
        Substitution Period (minutes):
        <input
          type="number"
          value={subPeriod}
          onChange={(e) => setSubPeriod(e.target.value)}
        />
      </label>

      <label>
        Fairness (1-10):
        <input
          type="number"
          value={fairness}
          onChange={(e) => setFairness(e.target.value)}
        />
      </label>

      <h2>Players</h2>
      <button onClick={handleAddPlayer}>Add Player</button>
      {players.map((player, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Name"
            value={player.name}
            onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Number"
            value={player.number}
            onChange={(e) => handlePlayerChange(index, 'number', e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating (1-10)"
            value={player.rating}
            onChange={(e) => handlePlayerChange(index, 'rating', e.target.value)}
          />
        </div>
      ))}

      <button onClick={calculateSubs}>Calculate Substitution Order</button>

      <h2>Substitution Order</h2>
      {subOrder.map((sub, index) => (
        <div key={index}>
          <h3>Period {sub.period}</h3>
          <p>On Field: {sub.onField.map(p => p.name).join(', ')}</p>
          <p>Off Field: {sub.offField.map(p => p.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
