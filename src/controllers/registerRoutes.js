const express = require('express');
const peopleModel = require('../models/mongodb/peopleModel')
const jwtAuth = require('./midwares/jwtAuth');

const router = express.Router();


router.get('/register', jwtAuth, async (req, res) => {
    try {

        let read;
        
        if (req.query.id){ // Busca pelo ID
            
            read = await peopleModel.findById(req.query.id);

        } else if (req.query.name){ // Busca por nomes parecidos, ?name= , pode fazer paginação, ?skip= , &limit=

            const regexName = { name: {$regex: `.*${req.query.name}*.` }};
            
            read = await peopleModel.find(regexName).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));

        } else { // Retorna tudo, pode fazer paginação, ?skip= , &limit=

            read = await peopleModel.find().skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));

        }

        return res.json(read);        

    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.get('/register/:id', jwtAuth, async (req, res) => {
    try {

        let read = await peopleModel.findById(req.params.id);

        return res.json(read);        

    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.post('/register', jwtAuth, async (req, res) => {

    req.assert('name', 'invalid name').isLength({ min: 2, max: 16});
    req.assert('age', 'invalid age').isInt();
    req.assert('gender', 'invalid gender').isIn(["Male", "male", 'Female', 'female', "Neither", 'neither']);

    let errors = req.validationErrors();

    if(errors){
        return res.status(400).json(errors);
    }

    try {
 
       const create = await peopleModel.create(req.body);

        return res.json(create);

    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.put('/register/:id', jwtAuth, async (req, res) => {

    if(req.body.name){
        req.assert('name', 'invalid name').isLength({ min: 2, max: 16});
    }

    if(req.body.age){
        req.assert('age', 'invalid age').isInt();
    }
    
    if(req.body.gender){
        req.assert('gender', 'invalid gender').isIn(["Male", "male", 'Female', 'female', "Neither", 'neither']);
    }
    
    let errors = req.validationErrors();

    if(errors){
        return res.status(400).json(errors);
    }

    try {

        const update = await peopleModel.findByIdAndUpdate(req.params.id, req.body, { new: true }) // new: true retorna o objeto com as alterações
        //const update = await peopleModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        
        return res.json(update);

    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.delete('/register/:id', jwtAuth, async (req, res) => {
    try {

        const del = await peopleModel.findByIdAndDelete(req.params.id)

        return res.json(del);

    } catch (error) {   
        //console.error(error);
        res.status(500).json(error);
    }
});


module.exports = router;