import React from 'react';
import logo from './logo.svg';
import './App.css';

import MyButton from './components/Button'; 

function App() {
  return (
    <div className="App">
    
    <MyButton text="Click me" onClick={() => alert('Clicked')} />
    
    </div>
  );
}

export default App;
