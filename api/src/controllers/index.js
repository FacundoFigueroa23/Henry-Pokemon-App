const axios = require('axios').default;
const { POKEMONS_URL, POKEMON_NAME, POKEMON_ID, POKEMONS_TYPES } = require('../utils/constants');
const {Pokemon, Type} = require('../db');

async function getApiData(){
    const urlPokemons = await axios.get(`${POKEMONS_URL}?limit=40`);
    let pokemons = [];
    for(let pokemon of urlPokemons.data.results){
        const pokemonInfo = await axios.get(pokemon.url);
        pokemons.push(pokemonInfo.data);
    }
    return getPrincipal(pokemons);
}

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
    });
}

function getDetail(pok){
    if(pok.hasOwnProperty("stats")){
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
    }else{
        return {
            id: pok.id,
            name: pok.name,
            height: pok.height,
            weight: pok.weight,
            hp: pok.hp,
            attack: pok.attack,
            defense: pok.defense,
            speed: pok.speed,
            types: pok.types
        }
    }  
}

async function getDbData(){
    return await Pokemon.findAll({
        attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'image'],
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
}

async function getAllData(){
    const apiInfo = await getApiData();
    const dbInfo = await getDbData();
    return apiInfo.concat(dbInfo);
}

module.exports = {
    getApiData,
    getDbData,
    getAllData,
    getPrincipal,
    getDetail
}