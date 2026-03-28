require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task2_fitnessapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected (Task 2)'))
  .catch(err => console.log(err));

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Task 2 Server started on port ${PORT}`));
