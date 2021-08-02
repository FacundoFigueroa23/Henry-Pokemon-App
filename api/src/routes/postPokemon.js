const { Router } = require('express');
const {Pokemon, Type} = require('../db');

const router = Router();

router.post('/pokemon', async (req, res, next) => {
    try{
        const {name, image, hp, attack, defense, speed, height, weight, create, types} = req.body;
        if(!name || !types) return res.status(404).send("Faltan datos");
        const existe = await Pokemon.findAll({
            where: {
                name
            }
        });
        if(existe.length !== 0){
            return res.status(404).send("Ya existe un pokemon con ese nombre");
        }else{
            const pokemonCreated = await Pokemon.create({
                name: name.toLowerCase(),
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                create
            });
            const typesDb = await Type.findAll({
                where: {
                    name: types
                }
            });
            await pokemonCreated.addType(typesDb);
            return res.status(200).send("El pokemon fue creado con éxito");
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;