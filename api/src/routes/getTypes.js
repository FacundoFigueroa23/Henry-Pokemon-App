const { Router } = require('express');
const {Type} = require('../db');
const axios = require('axios').default;
const {POKEMONS_TYPES} = require('../utils/constants');

const router = Router();

router.get('/types', async (req, res, next) => {
    try{
        const existe = await Type.findAll({
            attributes: ['id', 'name']
        });
        if(existe.length === 0){
            const response = await axios.get(`${POKEMONS_TYPES}`);
            for(let type of response.data.results){
                await Type.create({
                    name: type.name
                });
            }
            console.log("Se crearon los types");
            return res.status(200).send(await Type.findAll({
                attributes: ['id', 'name']
            }));
        }else{
            console.log("Se trajeron de la db los types");
            return res.status(200).send(existe);
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;