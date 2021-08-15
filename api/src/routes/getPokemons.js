const { Router } = require('express');
const axios = require('axios').default;
const {get_all_data, get_detail, get_db_data} = require('../controllers');
const {POKEMON_NAME} = require('../utils/constants');

const router = Router();

router.get('/pokemons', async (req, res, next) => {
    try{
        const {name} = req.query;
        if(!name){
            return res.status(200).send(await get_all_data());
        }else{
            const pokemons_db = await get_db_data();
            const existe_db = pokemons_db.find( pokemon => pokemon.name === name.toLowerCase());
            if(existe_db) return res.status(200).send(existe_db);
            const existe_api = await axios.get(`${POKEMON_NAME}${name.toLowerCase()}`);
            if(existe_api.data) return res.status(200).send(get_detail(existe_api.data));
            return res.status(404).send("El pokemon buscado no existe");
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;