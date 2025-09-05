import React from 'react';
// 1. Garante que estamos a importar o CSS principal e o nosso novo Dashboard.
import './index.css';
import Dashboard from './dashboard.jsx';

function App() {
  // 2. A única função do App.js é mostrar o componente Dashboard.
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;

