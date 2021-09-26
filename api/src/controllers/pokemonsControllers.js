const axios = require('axios').default
const { POKEMON_NAME, POKEMON_ID } = require('../utils/constants.js')
const { getAllData, getDbData, getDetail} = require('../utils/index.js')
const { Pokemon, Type } = require('../db.js')

// Traigo todos los pokemons o el buscado por nombre
async function getPokemons(req, res, next){
    const {name} = req.query
    try{
        if(!name){
            return res.status(200).send(await getAllData())
        }else{
            const pokemonsDb = await getDbData()
            const existeDb = pokemonsDb.find( pokemon => pokemon.name === name.toLowerCase())
            if(existeDb){
                console.log("El pokemon se trajo de la db")
                return res.status(200).send(existeDb)
            }
            try{
                const existeApi = await axios.get(`${POKEMON_NAME}${name.toLowerCase()}`)
                if(existeApi.data){
                    console.log("El pokemon se trajo de la api")
                    return res.status(200).send(getDetail(existeApi.data))
                }
            }catch(e){
                console.log("El pokemon buscado no existe")
                return res.sendStatus(404)
            }
        }
    }catch(error){
        next(error)
    }
}

// Traigo el pokemon buscado por id
async function getPokemonById(req, res, next){
    const {id} = req.params
    try{
        let existeDb = await getDbData()
        existeDb = existeDb.find( pok => pok.id === id)
        if(existeDb){
            console.log("El pokemon se trajo de la db")
            return res.status(200).send(existeDb)
        }
        try{
            const existeApi = await axios.get(`${POKEMON_ID}${id}`)
            if(existeApi.data){
                console.log("El pokemon se trajo de la api")
                return res.status(200).send(getDetail(existeApi.data))
            }
        }catch(e){
            console.log("El pokemon buscado no existe")
            return res.sendStatus(404)
        }
    }catch(error){
        next(error)
    }
}

// Creo un pokemon
async function postPokemon(req, res, next){
    const {name, image, hp, attack, defense, speed, height, weight, create, types} = req.body
    try{
        if(!name || !types){
            console.log("Faltan datos: name o types")
            return res.sendStatus(404)
        }
        const existe = await Pokemon.findAll({
            where: {
                name
            }
        });
        if(existe.length !== 0){
            console.log("Ya existe un pokemon con ese nombre")
            return res.sendStatus(404)
        }else{
            const pokemonCreated = await Pokemon.create({
                name: name.toLowerCase(),
                image,
                hp: Number(hp),
                attack: Number(attack),
                defense: Number(defense),
                speed: Number(speed),
                height: Number(height),
                weight: Number(weight),
                create
            });
            const allTypes = await Type.findAll({
                where: {
                    name: types
                }
            });
            await pokemonCreated.addType(allTypes)
            console.log("El pokemon fue creado con éxito")
            return res.sendStatus(200)
        }
    }catch(error){
        next(error);
    }
}

module.exports = {
    getPokemons,
    getPokemonById,
    postPokemon
}