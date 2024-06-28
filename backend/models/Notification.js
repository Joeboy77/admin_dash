const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: String,
  message: String,
  userId: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
