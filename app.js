const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = config.get('port') || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routers/auth.router'));
app.use('/api', require('./routers/todos.route'));

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoURL'));
    app.listen(PORT, () => console.log(`This server listening on ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
