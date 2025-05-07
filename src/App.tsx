import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'
import TaskList from './components/TaskList'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>Moja Aplikacja React</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
          aria-label="Przełącz motyw"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      
      <main>
        <section className="counter-section">
          <h2>Licznik</h2>
          <Counter initialValue={0} />
        </section>
        
        <section className="tasks-section">
          <h2>Lista zadań</h2>
          <TaskList />
        </section>
      </main>
      
      <footer>
        <p>© {new Date().getFullYear()} - Prosta Aplikacja React z TypeScript i Vitest</p>
      </footer>
    </div>
  )
}

export default App