const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const Product = require('./models/Product');
const User = require('./models/User');
const Notification = require('./models/Notification');

const app =express()
app.use(bodyParser.json())
app.use(cors())

const uri = 'mongodb+srv://joseph:National66715@cluster0.gvkyc6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//CRUD
app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  });

  app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });

  app.put('/api/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

  app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

  // User details route
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

// Notification routes
app.post('/api/notifications', async (req, res) => {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification);
});
app.get('/api/notifications', async (req, res) => {
    const notifications = await Notification.find();
    res.send(notifications);
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));