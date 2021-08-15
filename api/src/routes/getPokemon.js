const { Router } = require('express');
const axios = require('axios').default;
const {get_detail, get_db_data} = require('../controllers');
const {POKEMON_ID} = require('../utils/constants');

const router = Router();

router.get('/pokemons/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        let existe_db = await get_db_data();
        existe_db = existe_db.find( pok => pok.id === id);
        if(existe_db) return res.status(200).send(get_detail(existe_db));
        const existe_api = await axios.get(`${POKEMON_ID}${id}`);
        if(existe_api.data) return res.status(200).send(get_detail(existe_api.data));
        return res.status(404).send("El pokemon buscado no existe");
    }catch(error){
        next(error);
    }
});

module.exports = router;