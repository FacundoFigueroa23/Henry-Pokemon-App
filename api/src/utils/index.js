// Defino funciones para manejar los datos de los pokemons.

const axios = require('axios').default
const { POKEMONS_URL } = require('./constants.js')
const { Pokemon, Type } = require('../db.js')

// Funcion en la que traigo los pokemons de la api.
async function getApiData(){
    let pokemons = await axios.get(POKEMONS_URL)
    pokemons = pokemons.data.results.map(obj => axios.get(obj.url))
    pokemons = await axios.all(pokemons)
    pokemons = pokemons.map( obj => obj.data)
    return getPrincipal(pokemons)
}

// Funcion en la que traigo los pokemons de la base de datos.
async function getDatabaseData(){
    let pokemons = await Pokemon.findAll({
        attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'image', 'create'],
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    if(pokemons.length !== 0){
        pokemons = pokemons.map(pok => pok.toJSON())
        for(let i=0; i<pokemons.length; i++){
            pokemons[i].types = pokemons[i].types.map(type => type.name)
        }
    }
    return pokemons
}

// Funcion en la que traigo los pokemons de la api y los de la base de datos.
async function getAllData(){
    const apiInfo = await getApiData()
    const dbInfo = await getDatabaseData()
    return apiInfo.concat(dbInfo)
}

// Funcion en la que cambio los nombres de las propiedades de los pokemons que vienen
// de la api por los nombres de las propiedades de mi modelo de pokemon.
function getPrincipal(array){
    return array.map( pok => {
        return {
            id: pok.id,
            name: pok.name,
            height: pok.height,
            weight: pok.weight,
            hp: pok.stats[0].base_stat,
            attack: pok.stats[1].base_stat,
            defense: pok.stats[2].base_stat,
            speed: pok.stats[5].base_stat,
            image: pok.sprites.front_default,
            types: pok.types.map( obj => obj.type.name)
        }
    })
}

// Funcion en la que cambio los nombres de las propiedades del pokemon que viene
// de la api por los nombres de las propiedades de mi modelo de pokemon.
function getDetail(pok){
    return {
        id: pok.id,
        name: pok.name,
        height: pok.height,
        weight: pok.weight,
        hp: pok.stats[0].base_stat,
        attack: pok.stats[1].base_stat,
        defense: pok.stats[2].base_stat,
        speed: pok.stats[5].base_stat,
        image: pok.sprites.front_default,
        types: pok.types.map( obj => obj.type.name)
    }
}

// Funcion en la que cambio la forma en que envio los tipos de pokemon.
function getTypes(array){
    return array.map( type => type.name)
}

module.exports = {
    getApiData,
    getDatabaseData,
    getAllData,
    getPrincipal,
    getDetail,
    getTypes
}