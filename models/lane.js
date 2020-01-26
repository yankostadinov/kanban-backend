const mongoose = require('mongoose');

const laneSchema = new mongoose.Schema({
	title: { type: String, required: true },
	order: Number,
	hidden: Boolean,
});

laneSchema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Lane', laneSchema);
