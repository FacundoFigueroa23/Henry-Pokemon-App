const { Router } = require('express');
const axios = require('axios').default;
const {getDetail, getDbData} = require('../controllers');
const {POKEMON_ID} = require('../utils/constants');
const {Pokemon} = require('../db');

const router = Router();

router.get('/pokemons/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        let existeDb = await getDbData();
        existeDb = existeDb.find( pok => pok.id === id);
        if(existeDb) return res.status(200).send(getDetail(existeDb));
        const existeApi = await axios.get(`${POKEMON_ID}${id}`);
        if(existeApi.data) return res.status(200).send(getDetail(existeApi.data));
        return res.status(404).send("El pokemon buscado no existe");
    }catch(error){
        next(error);
    }
});

module.exports = router;