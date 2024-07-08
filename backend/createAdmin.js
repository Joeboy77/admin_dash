const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');


//connecting mongoDb
const uri = 'mongodb+srv://joseph:National66715@cluster0.gvkyc6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const createAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('elinam', salt);

  const admin = new User({
    name: 'Admin User',
    email: 'daker@gmail.com',
    password: hashedPassword,
    isAdmin: true,
  });

  await admin.save();
  console.log('Admin user created');
  mongoose.disconnect();
};

createAdmin();
