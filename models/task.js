const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	subject: String,
	lane: String,
	assignee: String,
	important: Boolean,
});

taskSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Task', taskSchema);
