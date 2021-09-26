const axios = require('axios').default
const { POKEMONS_URL } = require('./constants.js')
const { Pokemon, Type } = require('../db.js')

// Traigo los pokemons de la api
async function getApiData(){
    let pokemons = await axios.get(POKEMONS_URL)
    pokemons = pokemons.data.results.map(obj => axios.get(obj.url))
    pokemons = await axios.all(pokemons)
    pokemons = pokemons.map( obj => obj.data)
    return getPrincipal(pokemons)
}

// Traigo los pokemons de la db
async function getDbData(){
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

// Concateno los pokemons de la api y los de la db
async function getAllData(){
    const apiInfo = await getApiData()
    const dbInfo = await getDbData()
    return apiInfo.concat(dbInfo)
}

// Cambio los nombres de las propiedades de los pokemons que me vienen de la api por los nombres de las propiedades de mi modelo pokemon
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

// Cambio los nombres de las propiedades del pokemon que me viene de la api por los nombres de las propiedades de mi modelo pokemon
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

// Cambio la forma en la que me llegan los tipos de pokemon de la api
function getTypes(array){
    return array.map( type => type.name)
}

module.exports = {
    getApiData,
    getDbData,
    getAllData,
    getPrincipal,
    getDetail,
    getTypes
}