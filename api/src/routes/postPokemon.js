const { Router } = require('express');
const {Pokemon, Type} = require('../db');

const router = Router();

router.post('/pokemon', async (req, res, next) => {
    try{
        const {name, image, hp, attack, defense, speed, height, weight, create, types} = req.body;
        if(!name || !types) return res.status(404).send("Faltan datos");
        if(typeof name !== 'string' || typeof image !== 'string' || typeof hp !== 'number' || typeof attack !== 'number' || typeof defense !== 'number' || typeof speed !== 'number' || typeof height !== 'number' || typeof weight !== 'number') return res.status(404).send("Datos erroneos");
        const existe = await Pokemon.findAll({
            where: {
                name
            }
        });
        if(existe.length !== 0){
            return res.status(404).send("Ya existe un pokemon con ese nombre");
        }else{
            const pokemon_created = await Pokemon.create({
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
            const all_types = await Type.findAll({
                where: {
                    name: types
                }
            });
            await pokemon_created.addType(all_types);
            return res.status(200).send("El pokemon fue creado con éxito");
        }
    }catch(error){
        next(error);
    }
});

module.exports = router;