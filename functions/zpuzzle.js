const express = require('express');
const users = require('../models/users');

const router = express.Router();

router.post('/updateScore', (req, res) => {
    const number = req.body.number;
    const score = req.body.score;

    const updatedScore = score + number;

    res.json({ updatedScore });
});

router.post('/updateUserTime', async (req, res) => {
    const time = req.body.time;
    const username = req.body.username;

    const compareTime = await users.findOne({ where: { username: username }, attributes: ['score'] });

    if (time > compareTime.score) {
        users.update({ score: time }, { where: { username: username } });
        res.json({ newTime: time });
    }

    
});

module.exports = router;