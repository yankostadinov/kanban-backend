require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Task, Lane } = require('./models/');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/api/lanes', async (req, res) => {
	console.log(`get all lanes`);
	const lanes = await Lane.find({});
	res.json(lanes.map(lane => lane.toJSON()));
});

app.get('/api/lanes/:id', async (req, res) => {
	try {
		const lane = await Lane.findById(req.params.id);

		console.log(`get lane ${lane.id}`);
		res.json(lane.toJSON());
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

app.post('/api/lanes', async (req, res) => {
	if (req.body.title == null) return res.status(400).json({ error: 'title missing' });

	const lane = new Lane({
		title: req.body.title,
		hidden: false,
	});

	console.log(`post lane ${lane.id}`);

	const laneResponse = await lane.save();
	res.json(laneResponse.toJSON());
});

app.put('/api/lanes/:id', async (req, res) => {
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

app.delete('/api/lanes/:id', async (req, res) => {
	try {
		await Lane.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

app.get('/api/tasks', async (req, res) => {
	console.log(`get all tasks`);
	const tasks = await Task.find({});
	res.json(tasks.map(task => task.toJSON()));
});

app.get('/api/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		console.log(`get task ${task.id}`);
		res.json(task.toJSON());
	} catch(error) {
		console.log(error);
		res.status(404).end();
	}
});

app.post('/api/tasks', async (req, res) => {
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

app.put('/api/tasks/:id', async (req, res) => {
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

app.delete('/api/tasks/:id', async (req, res) => {
	try {
		await Task.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} catch(error) {
		res.status(404).end();
	}
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});
