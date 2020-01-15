require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Task, Lane } = require('./models/');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/api/lanes', async (req, res) => {
	console.log(`get all lanes`);
	const lanes = await Lane.find({});
	res.json(lanes);
});

app.get('/api/lanes/:id', async (req, res) => {
	try {
		const lane = await Lane.findById(req.params.id);

		console.log(`get lane ${lane.id}`);
		res.json(lane);
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
	res.json(laneResponse);
});

app.put('/api/lanes/:id', (req, res) => {
	let lane = database.lanes.find(lane => lane.id === parseInt(req.params.id));

	if (req.body.title != null) lane.title = req.body.title;
	if (req.body.order != null) lane.order = req.body.order;
	if (req.body.hidden != null) lane.hidden = req.body.hidden;

	console.log(`put lane ${lane.id}`);
	res.json(lane);
});

app.delete('/api/lanes/:id', (req, res) => {
	const laneIndex = database.lanes.findIndex(lane => lane.id === parseInt(req.params.id));

	database.lanes.splice(laneIndex, 1);

	console.log(`delete lane ${req.params.id}`);
	res.json(database.lanes);
});

app.get('/api/tasks', async (req, res) => {
	console.log(`get all tasks`);
	const tasks = await Task.find({});
	res.json(tasks);
});

app.get('/api/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		console.log(`get task ${task.id}`);
		res.json(task);
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
	res.json(taskResponse);
});

app.put('/api/tasks/:id', (req, res) => {
	let task = database.tasks.find(task => task.id === parseInt(req.params.id));

	if (req.body.subject != null) task.subject = req.body.subject;
	if (req.body.assignee != null) task.assignee = req.body.assignee;
	if (req.body.lane != null) task.lane = req.body.lane;

	console.log(`put task ${task.id}`);
	res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
	const taskIndex = database.tasks.findIndex(task => task.id === parseInt(req.params.id));

	database.tasks.splice(taskIndex, 1);

	console.log(`delete task ${req.params.id}`);
	res.json(task);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});
