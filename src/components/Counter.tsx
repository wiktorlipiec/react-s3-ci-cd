import React, { useState } from 'react'

interface CounterProps {
  initialValue?: number
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }

  const decrement = () => {
    setCount(prevCount => prevCount - 1)
  }

  const reset = () => {
    setCount(initialValue)
  }

  return (
    <div className="counter">
      <p data-testid="counter-value">Aktualna wartość: {count}</p>
      <div className="counter-buttons">
        <button onClick={decrement} aria-label="Zmniejsz">−</button>
        <button onClick={reset} aria-label="Reset">Reset</button>
        <button onClick={increment} aria-label="Zwiększ">+</button>
      </div>
    </div>
  )
}

export default Counter