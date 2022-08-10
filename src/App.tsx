import React from 'react';
import './App.css';
import Game, {DistanceMarker} from "./Game";
import {defaultDistanceSpecies} from "./Species";

const App = () => (
  <div className="App">
    <header className="App-header">
      SPÉCIESLE
    </header>
    <Game
      distanceType={defaultDistanceSpecies}
      distanceMarker={(n) => {
        if (n === 0) {
          return DistanceMarker.Exact
        } else if (n <= 10) {
          return DistanceMarker.Close
        } else {
          return DistanceMarker.Far
        }
      }}
    />
  </div>
)

export default App;
