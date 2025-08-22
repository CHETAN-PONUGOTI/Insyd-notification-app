const express = require('express');
const router = express.Router();
const Notification = require('../models/NotificationDB');

// POST /events - Simulates an event for a dynamic user
router.post('/events', async (req, res) => {
    try {
        const { type, sourceUserId, targetUserId, data } = req.body;
        
        let content;
        if (type === 'like_post') {
            content = `User ${sourceUserId} liked your post: "${data.postTitle}"`;
        } else if (type === 'follow_user') {
            content = `User ${sourceUserId} started following you.`;
        } else {
            return res.status(400).json({ message: 'Invalid event type' });
        }

        const newNotification = new Notification({
            userId: targetUserId, // Use the dynamic targetUserId from the request body
            type: type,
            content: content
        });

        await newNotification.save();
        res.status(201).json({ message: 'Event processed, notification created.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /notifications/:userId - Fetches notifications for a dynamic user ID
router.get('/notifications/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId }).sort({ timestamp: -1 });
        res.json({ notifications });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;