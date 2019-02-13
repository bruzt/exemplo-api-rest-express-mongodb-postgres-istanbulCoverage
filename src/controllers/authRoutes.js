const express = require('express');
const userModel = require('../models/postgres/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('./midwares/generateSecret');

const router = express.Router();

router.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ where: { username }});

    if(!user) return res.status(400).send({ erro: 'Senha ou usuario invalido!' })

    if(! await bcrypt.compare(password, user.password)) return res.status(400).send({ erro: 'Senha ou usuario invalido!' })

    const token = await jwt.sign({ user }, secret,  { expiresIn: 43200 }) // expira em 12 horas
    
    return res.send({ token });
});

module.exports = router;