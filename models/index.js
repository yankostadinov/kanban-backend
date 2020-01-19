const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

(async () => {
	console.log(`connecting to ${url}`);
	try {
		await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('connection successful\n\n');
	} catch(error) {
		console.log(`connection failed:\n${error.message}\n\n`);
	}
})();

module.exports = {
	Lane: require('./lane'),
	Task: require('./task'),
};
