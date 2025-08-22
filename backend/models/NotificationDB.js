const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Ensure this is 'String'
    type: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, default: 'unread' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NotificationDB', notificationSchema);