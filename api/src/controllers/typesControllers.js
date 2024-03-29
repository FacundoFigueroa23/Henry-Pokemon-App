// Defino los controladores para el tipo de pokemon.

const axios = require('axios').default
const { Type } = require('../db.js')
const { POKEMONS_TYPES } = require('../utils/constants.js')
const { getTypes } = require('../utils/index.js')

// Funcion para traer los tipos de pokemon primero desde la api.
// Despues los creo en mi base de datos para luego traerlos de ahi.
async function getTypesFromApi(req, res, next){
    try{
        const existe = await Type.findAll({
            attributes: ['name']
        })
        if(existe.length === 0){
            let response = await axios.get(`${POKEMONS_TYPES}`)
            response = response.data.results.map(type => Type.create({name: type.name}))
            response = await axios.all(response)
            console.log("Se crearon los types")
            return res.status(200).send(getTypes(response))
        }else{
            console.log("Se trajeron de la db los types")
            return res.status(200).send(getTypes(existe))
        }
    }catch(error){
        next(error)
    }
}

module.exports = {
    getTypesFromApi
}