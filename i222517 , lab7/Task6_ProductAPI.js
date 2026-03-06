const express = require('express');
const app = express();
const PORT = 3000;

// Small array of product objects
const products = [
    { "id": 1, "name": "Laptop", "price": 900 },
    { "id": 2, "name": "Mouse", "price": 20 },
    { "id": 3, "name": "Keyboard", "price": 50 }
];

// Route 1: complete list of products
app.get('/products', (req, res) => {
    res.json(products);
});

// Route 2: specific product by id
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(PORT, () => {
    console.log(`Task 6 Server is running on http://localhost:${PORT}`);
});
