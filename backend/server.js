const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Notification = require('./models/Notification');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const uri = 'mongodb+srv://joseph:National66715@cluster0.gvkyc6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to check for a valid token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid token' });
  }
};

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ message: 'Invalid email or password' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, 'jwtSecret');
  res.send({ token });
});

// CRUD routes for products (protected)
app.post('/api/products', authMiddleware, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

app.get('/api/products', authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(product);
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// User details route (protected)
app.get('/api/users/:id', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// Notification routes (protected)
app.post('/api/notifications', authMiddleware, async (req, res) => {
  const notification = new Notification(req.body);
  await notification.save();
  res.status(201).send(notification);
});

app.get('/api/notifications', authMiddleware, async (req, res) => {
  const notifications = await Notification.find();
  res.send(notifications);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
