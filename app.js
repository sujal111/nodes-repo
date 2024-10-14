
const express = require('express');
const app = express();
const UserRepository = require('./repositories/user.repository');
const ProductRepository = require('./repositories/product.repository');

app.use(express.json());

app.get('/users/:id', async (req, res) => {
  const user = await UserRepository.getById(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const users = await UserRepository.getAll(page, limit);
  res.send(users);
});

app.post('/users', async (req, res) => {
  const user = await UserRepository.create(req.body);
  res.status(201).send(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await UserRepository.update(req.params.id, req.body);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

app.delete('/users/:id', async (req, res) => {
  const result = await UserRepository.delete(req.params.id);
  if (!result) return res.status(404).send('User not found');
  res.send('User deleted');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
