import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <label>
        <input 
          type="checkbox" 
          checked={task.isCompleted} 
          onChange={() => onToggle(task.id)} 
        />
        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', color: task.isCompleted ? '#888' : '#000' }}>
          {task.text}
        </span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
