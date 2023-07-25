import './App.Modules.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:3000/api';

function App() {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  const handleAddTodo = () => {
    axios.post(`${BASE_URL}/todo/new`, {
      title: todo // Use the 'todo' state as the title for the new todo
    })
    .then((res) => {
      setTodos([...todos, res.data]);
      setTodo(""); // Clear the todo input after adding
    })
    .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${BASE_URL}/todo/delete/${id}`)
      .then(() => {
        // Filter out the deleted todo from the current todos state
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleTodoClick = (id) => {
    axios
      .get(`${BASE_URL}/todo/toggleStatus/${id}`)
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className='todo-input-wrapper'>
        <input
          className='todo-input-bar'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder='Add a new todo'
        />
        <div className='add-button' onClick={handleAddTodo}>
          +
        </div>
      </div>
      <div className='todos-list'>
        {!todos || !todos.length ? (
          <h3 style={{ textAlign: "center" }}>No Todo Found!</h3>
        ) : (
          todos.map((todo) => (
            <div className='todo' key={todo._id}>
              <span
                onClick={() => handleTodoClick(todo._id)}
                className={todo.complete ? "complete" : ""}
                id='todo-title'
              >
                {todo.title}
              </span>
              <span
                className='delete'
                onClick={() => handleDeleteTodo(todo._id)}
              >
                {/* Placeholder for delete icon */}
                <img src="#" alt='delete' height='20px' width='20px' />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
