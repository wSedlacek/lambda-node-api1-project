import express from 'express';
import cors from 'cors';

import { find, findByID, insert, update, remove } from './data/db';
import { validID, validUser } from './validate';

const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/users', async (_, res) => {
  try {
    const users = await find();
    res.json(users);
  } catch {
    res.status(500);
    res.json({ error: 'The users information could not be retrieved.' });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    if (!(await validID(req.params.id))) {
      res.status(404);
      res.json({ message: 'The user with the specified ID does not exist.' });
    }

    const user = await findByID(req.params.id);
    res.json(user);
  } catch {
    res.status(500);
    res.json({ error: 'The users information could not be retrieved.' });
  }
});

server.post('/api/users', async (req, res) => {
  if (!validUser(req.body)) {
    res.status(400);
    res.json({ errorMessage: 'Please provide name and bio for the user.' });
  }

  try {
    const id = await insert(req.body);
    const user = await findByID(id);
    res.status(201);
    res.json(user);
  } catch {
    res.status(500);
    res.json({ error: 'There was an error while saving the user to the database' });
  }
});

server.put('/api/users/:id', async (req, res) => {
  if (!(await validID(req.params.id))) {
    res.status(404);
    res.json({ message: 'The user with the specified ID does not exist.' });
  }

  if (!validUser(req.body)) {
    res.status(400);
    res.json({ errorMessage: 'Please provide name and bio for the user.' });
  }

  const updated = await update(req.params.id, req.body);
  if (!updated) {
    res.status(500);
    res.json({ error: 'There was an error while saving the user to the database' });
  }

  const user = await findByID(req.params.id);
  res.status(201);
  res.json(user);
});

server.listen(5000, () => console.log('Server running on http://localhost:5000'));
