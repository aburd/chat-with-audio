import React from 'react';
import './App.css';
import Chat from './Chat';

function App({ audio }) {
  return (
    <div className="App">
      <header className="App-header">
        <Chat audio={audio} />
      </header>
    </div>
  );
}

export default App;
