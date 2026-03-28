require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task3_streamingapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected (Task 3)'))
  .catch(err => console.log(err));

const authRoute = require('./routes/auth');
const contentRoute = require('./routes/content');

app.use('/api/auth', authRoute);
app.use('/api/content', contentRoute);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Task 3 Server started on port ${PORT}`));
