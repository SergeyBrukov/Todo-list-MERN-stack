const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const config = require('config');
const router = Router();

/////register

router.post(
  '/register',
  [
    check('email', 'Not correct email').isEmail(),
    check('password', 'Not correct password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorected data registration',
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(404).json({ message: 'This email was registration yet' });
      }
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({ email, password: passwordHash });
      newUser.save();
      res.status(201).json({ message: 'User has been created' });
    } catch (error) {
      res.json(500).json({ message: 'Somesing wrong, try after few second' });
    }
  },
);

/////login

router.post(
  '/login',
  [
    check('email', 'Not correct email').isEmail(),
    check('password', 'Not correct password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorected data registration',
        });
      }

      const { email, password } = req.body;
      const examinationUser = await User.findOne({ email });
      if (!examinationUser) {
        res.status(400).json({ message: 'This email wasn`t found in system' });
      }
      const examinationPassword = await bcrypt.compare(password, examinationUser.password);

      if (!examinationPassword) {
        res.status(400).json({ message: 'This password wasn`t found in system' });
      }
      const token = jwt.sign({ userId: examinationUser.id }, config.get('jwtSecret'));
      res.json({ token, userId: examinationUser.id });
    } catch (error) {
      res.status(500).json({ message: 'Somesing wrong, try after few second' });
    }
  },
);
module.exports = router;
