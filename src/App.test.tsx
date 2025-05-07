import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Moja Aplikacja React')).toBeInTheDocument()
  })

  it('toggles dark mode when the button is clicked', () => {
    render(<App />)
    const themeToggle = screen.getByLabelText('Przełącz motyw')
    
    // Sprawdź początkowy stan (jasny motyw)
    expect(themeToggle.textContent).toBe('🌙')
    expect(document.querySelector('.dark-mode')).toBeNull()
    
    // Kliknij przycisk
    fireEvent.click(themeToggle)
    
    // Sprawdź czy motyw się zmienił
    expect(themeToggle.textContent).toBe('☀️')
    expect(document.querySelector('.dark-mode')).not.toBeNull()
  })

  it('renders the Counter component', () => {
    render(<App />)
    expect(screen.getByText('Licznik')).toBeInTheDocument()
    expect(screen.getByText('Aktualna wartość: 0')).toBeInTheDocument()
  })

  it('renders the TaskList component', () => {
    render(<App />)
    expect(screen.getByText('Lista zadań')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Dodaj nowe zadanie')).toBeInTheDocument()
  })
})