const express = require('express');
const bcrypt = require('bcrypt');
const { where, fn, col } = require('sequelize');

const jwtAuth = require('./midwares/jwtAuth');
const userModel = require('../models/postgres/userModel');


const router = express.Router();

router.get('/login', jwtAuth, async (req, res) => {
    try {

        let read;
        
        if(req.query.id){ // find by ID, ?id=
            
            read = await userModel.findByPk(req.query.id);

            read = [ read ];

        } else if (req.query.username) { // find by username, ?username=

            //read = await userModel.findAll({ where: { username: `${req.query.username}`}});
            read = await userModel.findAll({ where: where(fn('LOWER', col('username')), 'LIKE', `%${req.query.username}%`)});

        } else {

        read = await userModel.findAll();

        }
        
        read.map(element => { // não deixa a senha ser exibida
            return element.password = undefined;
        })

        return res.send(read);

    } catch (error) {
        //console.error(error);
        res.status(500).send({ error });
    }
});

router.post('/login', jwtAuth, async (req, res) => {
    try {
        const user = req.body;
        
        user.password = await bcrypt.hash(user.password, 10);
        
        let create = await userModel.create(user);

        create = [ create ];
        create.map(element => { // não deixa a senha ser exibida
            return element.password = undefined;
        })
        
        return res.send(create);

    } catch (error) {
        //console.error(error);
        res.status(500).send({ error });
    }
});

router.patch('/login/:id', jwtAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;

        const update = await userModel.update(user, { where: { id }})

        return res.send(update);

    } catch (error) {
        //console.error(error);
        res.status(500).send({ error });
    }
});

router.delete('/login/:id', jwtAuth, async (req, res) => {
    try {
        const id = req.params.id;

        await userModel.destroy({ where: { id }});

        return res.sendStatus(200);

    } catch (error) {   
        //console.error(error);
        res.status(500).send({ error });
    }
});

module.exports = router;