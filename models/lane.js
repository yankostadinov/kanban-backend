const mongoose = require('mongoose');

const Lane = mongoose.model('Lane', new mongoose.Schema({
	title: String,
	order: Number,
	hidden: Boolean,
}));

module.exports = Lane;
