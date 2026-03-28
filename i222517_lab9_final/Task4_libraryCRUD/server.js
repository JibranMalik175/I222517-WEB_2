require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task4_libraryapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected (Task 4)'))
  .catch(err => console.log(err));

const categoryRoute = require('./routes/categories');
const bookRoute = require('./routes/books');

app.use('/api/categories', categoryRoute);
app.use('/api/books', bookRoute);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Task 4 Server started on port ${PORT}`));
