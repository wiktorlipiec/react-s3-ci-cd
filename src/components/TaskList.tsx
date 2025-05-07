import React, { useState } from 'react'

interface Task {
  id: number
  text: string
  completed: boolean
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  const addTask = () => {
    if (newTaskText.trim() === '') return
    
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false
    }
    
    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="task-list">
      <div className="add-task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Dodaj nowe zadanie"
          aria-label="Nowe zadanie"
          data-testid="new-task-input"
        />
        <button onClick={addTask} aria-label="Dodaj zadanie">Dodaj</button>
      </div>
      
      {tasks.length === 0 ? (
        <p className="no-tasks" data-testid="no-tasks-message">Brak zadań do wyświetlenia.</p>
      ) : (
        <ul className="tasks" data-testid="tasks-list">
          {tasks.map(task => (
            <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                aria-label={`Oznacz zadanie: ${task.text} jako ${task.completed ? 'nieukończone' : 'ukończone'}`}
              />
              <span className="task-text">{task.text}</span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-task"
                aria-label={`Usuń zadanie: ${task.text}`}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList