import React, { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <div className="task-input">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Add a new task..."
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}
