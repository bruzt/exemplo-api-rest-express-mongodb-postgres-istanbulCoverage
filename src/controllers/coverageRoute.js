const express = require('express');
const path = require('path');
const authJwt = require('./midwares/jwtAuth');

const router = express.Router();

router.use(express.static(path.join(__dirname, '../../coverage')));

router.get('/coverage', authJwt, (req, res) => {
    try {

        return res.sendFile(path.join(__dirname, '../../coverage', 'index.html'));

    } catch (error) {
        return res.status(500).send({ error });
    }
});

module.exports = router;