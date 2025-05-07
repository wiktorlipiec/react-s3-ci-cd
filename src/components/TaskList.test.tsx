import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskList from './TaskList'

describe('TaskList Component', () => {
  it('renders empty task list with message', () => {
    render(<TaskList />)
    expect(screen.getByTestId('no-tasks-message')).toBeInTheDocument()
    expect(screen.getByTestId('no-tasks-message').textContent).toBe('Brak zadań do wyświetlenia.')
  })

  it('adds a new task when Add button is clicked', () => {
    render(<TaskList />)
    
    // Wpisz nowe zadanie
    const input = screen.getByTestId('new-task-input')
    fireEvent.change(input, { target: { value: 'Nowe testowe zadanie' } })
    
    // Kliknij przycisk Dodaj
    fireEvent.click(screen.getByLabelText('Dodaj zadanie'))
    
    // Sprawdź czy zadanie zostało dodane
    expect(screen.queryByTestId('no-tasks-message')).not.toBeInTheDocument()
    expect(screen.getByTestId('tasks-list')).toBeInTheDocument()
    expect(screen.getByText('Nowe testowe zadanie')).toBeInTheDocument()
    
    // Sprawdź czy pole input zostało wyczyszczone
    expect(input.value).toBe('')
  })

  it('adds a new task when Enter key is pressed', () => {
    render(<TaskList />)
    
    // Wpisz nowe zadanie
    const input = screen.getByTestId('new-task-input')
    fireEvent.change(input, { target: { value: 'Zadanie dodane przez Enter' } })
    
    // Naciśnij Enter
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })
    
    // Sprawdź czy zadanie zostało dodane
    expect(screen.getByText('Zadanie dodane przez Enter')).toBeInTheDocument()
  })

  it('does not add empty tasks', () => {
    render(<TaskList />)
    
    // Nie wpisuj niczego i kliknij Dodaj
    fireEvent.click(screen.getByLabelText('Dodaj zadanie'))
    
    // Sprawdź czy nadal jest komunikat o braku zadań
    expect(screen.getByTestId('no-tasks-message')).toBeInTheDocument()
  })

  it('toggles task completion status when checkbox is clicked', () => {
    render(<TaskList />)
    
    // Dodaj zadanie
    const input = screen.getByTestId('new-task-input')
    fireEvent.change(input, { target: { value: 'Zadanie do ukończenia' } })
    fireEvent.click(screen.getByLabelText('Dodaj zadanie'))
    
    // Znajdź zadanie i sprawdź jego początkowy stan
    const taskItem = screen.getByText('Zadanie do ukończenia').closest('li')
    expect(taskItem).not.toHaveClass('completed')
    
    // Kliknij checkbox
    const checkbox = screen.getByLabelText('Oznacz zadanie: Zadanie do ukończenia jako ukończone')
    fireEvent.click(checkbox)
    
    // Sprawdź czy zadanie jest oznaczone jako ukończone
    expect(taskItem).toHaveClass('completed')
    
    // Kliknij ponownie checkbox
    fireEvent.click(checkbox)
    
    // Sprawdź czy zadanie nie jest już oznaczone jako ukończone
    expect(taskItem).not.toHaveClass('completed')
  })

  it('deletes a task when Delete button is clicked', () => {
    render(<TaskList />)
    
    // Dodaj zadanie
    const input = screen.getByTestId('new-task-input')
    fireEvent.change(input, { target: { value: 'Zadanie do usunięcia' } })
    fireEvent.click(screen.getByLabelText('Dodaj zadanie'))
    
    // Sprawdź czy zadanie zostało dodane
    expect(screen.getByText('Zadanie do usunięcia')).toBeInTheDocument()
    
    // Kliknij przycisk Usuń
    fireEvent.click(screen.getByLabelText('Usuń zadanie: Zadanie do usunięcia'))
    
    // Sprawdź czy zadanie zostało usunięte
    expect(screen.queryByText('Zadanie do usunięcia')).not.toBeInTheDocument()
    expect(screen.getByTestId('no-tasks-message')).toBeInTheDocument()
  })
})