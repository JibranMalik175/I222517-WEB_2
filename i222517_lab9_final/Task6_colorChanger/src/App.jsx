import React, { useState } from 'react';

function App() {
  // State for Part 2
  const [reactColor, setReactColor] = useState('lightblue');
  const [reactInputValue, setReactInputValue] = useState('');

  // Part 1: HTML DOM Approach Handler
  const handleHtmlDOMChange = () => {
    // 1. Use document.getElementById to get the div and input
    const box = document.getElementById('htmlColorBox');
    const input = document.getElementById('htmlColorInput');
    
    // 2. Get the input value
    const newColor = input.value;
    
    // 3. Change the div's style.backgroundColor to the input value
    if (newColor) {
      box.style.backgroundColor = newColor;
    }
    
    // 4. Clear the input
    input.value = '';
  };

  // Part 2: React DOM Approach Handler
  const handleReactDOMChange = () => {
    // Get the color value from state input
    if (reactInputValue) {
      // Re-render the component by updating a variable
      setReactColor(reactInputValue);
      // Clear the input
      setReactInputValue('');
    }
  };

  return (
    <div className="app-container">
      <h2>Task 6: HTML DOM vs React DOM</h2>

      {/* Part 1: HTML DOM Manipulation */}
      <div className="section">
        <h3>Part 1: HTML DOM Manipulation</h3>
        <div 
          id="htmlColorBox" 
          className="color-box" 
          style={{ backgroundColor: 'lightgray' }}
        >
          HTML DOM Box
        </div>
        <div>
          <input 
            type="text" 
            id="htmlColorInput" 
            placeholder="Enter color (e.g., red, #ff0000)" 
          />
          <button onClick={handleHtmlDOMChange}>Change Color (HTML DOM)</button>
        </div>
      </div>

      {/* Part 2: React DOM Manipulation */}
      <div className="section">
        <h3>Part 2: React DOM Manipulation</h3>
        <div 
          className="color-box" 
          style={{ backgroundColor: reactColor }}
        >
          React DOM Box
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Enter color (e.g., red, #ff0000)" 
            value={reactInputValue}
            onChange={(e) => setReactInputValue(e.target.value)}
          />
          <button onClick={handleReactDOMChange}>Change Color (React DOM)</button>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="section">
        <h3>Comparison Section</h3>
        <ul>
          <li><strong>HTML DOM Approach:</strong> Directly manipulates the DOM element (imperative).</li>
          <li><strong>React DOM Approach:</strong> Updates the virtual DOM and React handles the actual DOM update (declarative).</li>
        </ul>
        
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>HTML DOM Approach</th>
              <th>React DOM Approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>How does it update the UI?</strong></td>
              <td>Imperatively specifies exactly how to change the element's style.</td>
              <td>Declaratively specifies what the UI should look like based on state.</td>
            </tr>
            <tr>
              <td><strong>Does it touch the DOM directly?</strong></td>
              <td>Yes (via <code>document.getElementById</code> AND style mutation).</td>
              <td>No (React handles the actual DOM mutation behind the scenes).</td>
            </tr>
            <tr>
              <td><strong>What happens on re-render?</strong></td>
              <td>No component re-render occurs. Only the specific mutated DOM node changes. Potential synchronization issues with React's representation.</td>
              <td>React updates the Virtual DOM, compares it (diffing), and strictly applies the differences to the actual DOM efficiently.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
