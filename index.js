const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const database = {
	"lanes": [
		{
			"title": "To Do",
			"order": 1,
			"hidden": false,
			"id": 1
		},
		{
			"title": "In Progress",
			"order": 2,
			"hidden": false,
			"id": 2
		},
		{
			"title": "Done",
			"order": 3,
			"hidden": false,
			"id": 3
		},
		{
			"title": "To Delete",
			"order": 4,
			"id": 4,
			"hidden": true
		}
	],
	"tasks": [
		{
			"id": 1,
			"date": 1572805598639,
			"subject": "Create basic structure",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 2,
			"date": 1572805598639,
			"subject": "Save and restore data",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 3,
			"date": 1572805598639,
			"subject": "Add lane drag and drop",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 4,
			"date": 1572805598639,
			"subject": "Add task drag and drop",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 5,
			"date": 1572805598639,
			"subject": "Edit/remove lane",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 6,
			"date": 1572805598639,
			"subject": "Add new task button",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 7,
			"date": 1572805598639,
			"subject": "Add new task modal",
			"lane": 3,
			"assignee": "Yan Kostadinov"
		},
		{
			"id": 8,
			"date": 1572805598639,
			"subject": "Edit/remove task",
			"lane": 4,
			"assignee": "Yan Kostadinov"
		}
	]
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/api/', (req, res) => {
	console.log(`get all`);
	res.json(database);
});

app.get('/api/lanes', (req, res) => {
	console.log(`get all lanes`);
	res.json(database.lanes);
});

app.get('/api/lanes/:id', (req, res) => {
	const id = req.params.id;
	const lane = database.lanes.find(lane => lane.id === parseInt(id));

	console.log(`get lane ${id}`);
	res.json(lane);
});

app.post('/api/lanes', (req, res) => {
	if (req.body.title == null) return res.status(400).json({ error: 'title missing' });

	const lane = {
		title: req.body.title,
		hidden: false,
		order: generateId(database.lanes),
		id: generateId(database.lanes),
	};

	database.lanes = database.lanes.concat(lane);

	console.log(`post lane ${lane.id}`);
	res.json(lane);
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

app.get('/api/tasks', (req, res) => {
	console.log(`get all tasks`);
	res.json(database.tasks);
});

app.get('/api/tasks/:id', (req, res) => {
	const id = req.params.id;

	console.log(`get task ${id}`);
	res.json(database.tasks.find(lane => lane.id === id));
});

app.post('/api/tasks', (req, res) => {
	if (req.body.subject == null) return res.status(400).json({ error: 'subject missing' });
	if (req.body.assignee == null) return res.status(400).json({ error: 'assignee missing' });
	if (req.body.lane == null) return res.status(400).json({ error: 'lane missing' });

	const task = {
		subject: req.body.subject,
		assignee: req.body.assignee,
		lane: req.body.lane,
		date: Date.now(),
		id: generateId(database.tasks),
	};

	database.tasks = database.tasks.concat(task);

	console.log(`post task ${task.id}`);
	res.json(task);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});

const generateId = (collection) => {
	const highestId = Math.max(...collection.map(element => element.id));
	return highestId + 1;
};
