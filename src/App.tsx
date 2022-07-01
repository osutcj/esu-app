import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useAppDispatch, useExampleSelector } from './store';
import { incrementExampleValue, deleteExampleState } from './store/example';

function App() {
  const appDispatch = useAppDispatch();
  const exampleState = useExampleSelector();

  const incrementCount = () => {
    appDispatch(incrementExampleValue());
  }

  const removeCount = () => {
    appDispatch(deleteExampleState());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={incrementCount}>
            count is: {exampleState.value ?? 'not-set'}
          </button>
          <button type="button" onClick={removeCount}>
            remove local store
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
