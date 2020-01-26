const lanesRouter = require('express').Router();
const Lane = require('../models/lane');

lanesRouter.get('/', async (req, res) => {
	console.log('get all lanes');
	const lanes = await Lane.find({});
	res.json(lanes.map(lane => lane.toJSON()));
});

lanesRouter.get('/:id', async (req, res) => {
	try {
		const lane = await Lane.findById(req.params.id);

		console.log(`get lane ${lane.id}`);
		res.json(lane.toJSON());
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

lanesRouter.post('/', async (req, res) => {
	if (req.body.title == null) return res.status(400).json({ error: 'title missing' });

	const lane = new Lane({
		title: req.body.title,
		hidden: false,
	});

	console.log(`post lane ${lane.id}`);

	const laneResponse = await lane.save();
	res.json(laneResponse.toJSON());
});

lanesRouter.put('/:id', async (req, res) => {
	let lane = {
		title: req.body.title,
		hidden: req.body.hidden,
	};

	try {
		await Lane.findByIdAndUpdate(req.params.id, lane, { new: true, omitUndefined: true });
		console.log(`put lane ${lane.id}`);
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

lanesRouter.delete('/:id', async (req, res) => {
	try {
		await Lane.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

module.exports = lanesRouter;
