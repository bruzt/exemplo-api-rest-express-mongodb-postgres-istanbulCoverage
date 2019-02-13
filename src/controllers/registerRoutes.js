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

        return res.send(read);        

    } catch (error) {
        //console.error(error);
        res.status(500).send({ error });
    }
});

router.post('/register', jwtAuth, async (req, res) => {
    try {
 
       const create = await peopleModel.create(req.body);

        return res.send(create);

    } catch (error) {
        //console.error(error);
        return res.status(500).send({ error });
    }
});

router.patch('/register/:id', jwtAuth, async (req, res) => {
    try {
        
        //console.log(req.query)

        const update = await peopleModel.findByIdAndUpdate(req.params.id, req.body, { new: true }) // new: true retorna o objeto com as alterações
        //const update = await peopleModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        
        return res.send(update);

    } catch (error) {
        //console.error(error);
        res.status(500).send({ error });
    }
});

router.delete('/register/:id', jwtAuth, async (req, res) => {
    try {

        const del = await peopleModel.findByIdAndDelete(req.params.id)

        return res.send(del);

    } catch (error) {   
        //console.error(error);
        res.status(500).send({ error });
    }
});


module.exports = router;