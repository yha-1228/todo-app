import React from 'react';
import './App.scss';
import TodoView from './components/TodoView';

function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <div className="card">
        <TodoView />
      </div>
    </div>
  );
}

export default App;
