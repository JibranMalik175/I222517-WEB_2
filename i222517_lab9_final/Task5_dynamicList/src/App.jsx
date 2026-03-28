import React from 'react';

function App() {
  const addItem = () => {
    // 1. Get value from the input box using DOM manipulation
    const inputElement = document.getElementById('itemInput');
    const value = inputElement.value.trim();

    if (value === "") return; // Don't add empty items

    // 2. Create a new <li> element
    const li = document.createElement('li');

    // 3. Set its text content
    li.textContent = value;

    // 4. Append it to the <ul> list
    const ul = document.getElementById('itemList');
    ul.appendChild(li);

    // 5. Clear the input box
    inputElement.value = '';
  };

  const removeLastItem = () => {
    // Get the ul element
    const ul = document.getElementById('itemList');
    
    // Check if there are any child elements
    if (ul.lastElementChild) {
       ul.removeChild(ul.lastElementChild);
    }
  };

  return (
    <div className="app-container">
      <h1>My Favorite Items</h1>
      
      {/* Input box */}
      <input 
        type="text" 
        id="itemInput" 
        placeholder="Type an item..." 
      />
      
      {/* Buttons */}
      <div>
        <button onClick={addItem}>Add Item</button>
        <button className="remove-btn" onClick={removeLastItem}>Remove Last Item</button>
      </div>

      {/* Empty ul element for holding items */}
      <ul id="itemList"></ul>
    </div>
  );
}

export default App;
