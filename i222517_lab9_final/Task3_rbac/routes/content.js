const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/admin', auth(['admin']), (req, res) => {
    res.json({ message: "Welcome to the content management panel!" });
});

module.exports = router;
