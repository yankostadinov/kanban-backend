const { MONGODB_URI } = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const lanesRouter = require('./controllers/lanes');
const tasksRouter = require('./controllers/tasks');
const mongoose = require('mongoose');

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connected to MongoDB'))
	.catch((error) => console.log('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.static('static'));
app.use(bodyParser.json());

app.use('/api/lanes', lanesRouter);
app.use('/api/tasks', tasksRouter);

module.exports = app;
