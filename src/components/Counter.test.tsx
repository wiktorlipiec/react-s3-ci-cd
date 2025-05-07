import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

describe('Counter Component', () => {
  it('renders with default value 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('counter-value').textContent).toBe('Aktualna wartość: 0')
  })

  it('renders with provided initial value', () => {
    render(<Counter initialValue={10} />)
    expect(screen.getByTestId('counter-value').textContent).toBe('Aktualna wartość: 10')
  })

  it('increments the counter when + button is clicked', () => {
    render(<Counter />)
    fireEvent.click(screen.getByLabelText('Zwiększ'))
    expect(screen.getByTestId('counter-value').textContent).toBe('Aktualna wartość: 1')
  })

  it('decrements the counter when - button is clicked', () => {
    render(<Counter initialValue={5} />)
    fireEvent.click(screen.getByLabelText('Zmniejsz'))
    expect(screen.getByTestId('counter-value').textContent).toBe('Aktualna wartość: 4')
  })

  it('resets the counter to initial value when Reset button is clicked', () => {
    render(<Counter initialValue={5} />)
    
    // Najpierw zwiększamy wartość
    fireEvent.click(screen.getByLabelText('Zwiększ'))
    expect(screen.getByTestId('counter-value').textContent).toBe('Aktualna wartość: 6')
    
    // Następnie resetujemy
    fireEvent.click(screen.getByLabelText('Reset'))
    expect(screen.getByTestId('counter-value').textContent).toBe('Aktualna wartość: 5')
  })
})