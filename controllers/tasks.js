const tasksRouter = require('express').Router();
const Task = require('../models/task');

tasksRouter.get('/', async (req, res) => {
	console.log('get all tasks');
	const tasks = await Task.find({});
	res.json(tasks.map(task => task.toJSON()));
});

tasksRouter.get('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		console.log(`get task ${task.id}`);
		res.json(task.toJSON());
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

tasksRouter.post('/', async (req, res) => {
	if (req.body.subject == null) return res.status(400).json({ error: 'subject missing' });
	if (req.body.assignee == null) return res.status(400).json({ error: 'assignee missing' });
	if (req.body.lane == null) return res.status(400).json({ error: 'lane missing' });

	const task = new Task({
		subject: req.body.subject,
		assignee: req.body.assignee,
		lane: req.body.lane,
		date: Date.now(),
	});

	console.log(`post task ${task.id}`);

	const taskResponse = await task.save();
	res.json(taskResponse.toJSON());
});

tasksRouter.put('/:id', async (req, res) => {
	let task = {
		subject: req.body.subject,
		assignee: req.body.assignee,
		lane: req.body.lane,
	};

	try {
		await Task.findByIdAndUpdate(req.params.id, task, { new: true, omitUndefined: true });
		console.log(`put task ${task.id}`);
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

tasksRouter.delete('/:id', async (req, res) => {
	try {
		await Task.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} catch(error) {
		res.status(404).end();
	}
});

module.exports = tasksRouter;
