import React from 'react';
import './App.css';

function App({ audio }) {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {
          console.log('starting')
          audio.playSentence('Hello world', audio.manSampleMap)
            .then(() => console.log('finished'))
        }}>Click me</button>
      </header>
    </div>
  );
}

export default App;
