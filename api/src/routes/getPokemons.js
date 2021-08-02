const { Router } = require('express');
const axios = require('axios').default;
const {getAllData, getDetail, getDbData} = require('../controllers');
const {POKEMON_NAME} = require('../utils/constants');

const router = Router();

router.get('/pokemons', async (req, res, next) => {
    try{
        const {name} = req.query;
        if(!name){
            return res.status(200).send(await getAllData());
        }else{
            const pokemonsDb = await getDbData();
            const existeDb = pokemonsDb.find( pokemon => pokemon.name === name.toLowerCase());
            if(existeDb) return res.status(200).send(existeDb);
            const existeApi = await axios.get(`${POKEMON_NAME}${name.toLowerCase()}`);
            if(existeApi.data) return res.status(200).send(getDetail(existeApi.data));
            return res.status(404).send("El pokemon buscado no existe");
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;