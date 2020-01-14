const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
	subject: String,
	lane: String,
	important: Boolean,
}));

module.exports = Task;
