const { Router } = require('express');
const { db } = require('../models/Todo');

const router = Router();
const authMidleware = require('./../middlaware/auth.midleware');
const Todo = require('./../models/Todo');

router.get('/todos', authMidleware, async (req, res) => {
  try {
    // const { title, important, succsess } = req.body;
    const { userId } = req.user;
    const todos = await Todo.find({ owner: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.post('/todos', authMidleware, async (req, res) => {
  try {
    const { title, important, succsess } = req.body;
    const { userId } = req.user;
    const todo = new Todo({
      title,
      important,
      succsess,
      owner: userId,
    });
    await todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.delete('/todos/:id/', authMidleware, async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: 'Succsess' });
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.patch('/todos/succsess/:id/:param', authMidleware, async (req, res) => {
  try {
    const { id, param } = req.params;
    console.log('id>>', id);
    const todo = await Todo.findById(id);
    await Todo.findByIdAndUpdate({ _id: id }, { [param]: !todo[param] });
    console.log(todo);
    res.status(200).json({ message: 'Succsess' });
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.patch('/todos-edit-text/:id', authMidleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { editValue } = req.body;
    await Todo.findByIdAndUpdate({ _id: id }, { title: editValue });
    res.status(200).json({ message: 'Succsess' });
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

router.get('/todos-search/:searchText', authMidleware, async (req, res) => {
  try {
    const { searchText } = req.params;

    const todos = await Todo.find({ title: { $regex: '.*' + searchText + '.*' } });

    console.log(todos);

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Somesing wrong, try after few second' });
  }
});

module.exports = router;
