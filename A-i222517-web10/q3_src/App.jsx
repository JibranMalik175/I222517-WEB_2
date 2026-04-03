import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import FilterControls from './FilterControls';
import TaskList from './TaskList';
import './index.css';

const INITIAL_TASKS = [
  { id: 1, text: "Read React documentation", isCompleted: false },
  { id: 2, text: "Build a small project", isCompleted: true },
  { id: 3, text: "Write lab report", isCompleted: false }
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTasks(INITIAL_TASKS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.isCompleted;
    if (filter === 'completed') return t.isCompleted;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Personal Task Manager Dashboard</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <TaskInput onAddTask={handleAddTask} />
          <FilterControls currentFilter={filter} onFilterChange={setFilter} />
          <TaskList 
            tasks={filteredTasks} 
            onToggleTask={handleToggleTask} 
            onDeleteTask={handleDeleteTask} 
          />
        </>
      )}
    </div>
  );
}
