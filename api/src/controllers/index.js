const axios = require('axios').default;
const { POKEMONS_URL } = require('../utils/constants');
const {Pokemon, Type} = require('../db');

async function get_api_data(){
    let pokemons = await axios.get(POKEMONS_URL);
    pokemons = pokemons.data.results.map(obj => axios.get(obj.url));
    pokemons = await axios.all(pokemons);
    pokemons = pokemons.map( obj => obj.data);
    return get_principal(pokemons);
}

async function get_db_data(){
    let pokemons = await Pokemon.findAll({
        attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'image', 'create'],
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    if(pokemons.length !== 0){
        pokemons = pokemons.map(pok => pok.toJSON());
        for(let i=0; i<pokemons.length; i++){
            pokemons[i].types = pokemons[i].types.map(type => type.name);
        }
    }
    return pokemons;
}

async function get_all_data(){
    const api_info = await get_api_data();
    const db_info = await get_db_data();
    return api_info.concat(db_info);
}

function get_principal(array){
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

function get_detail(pok){
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

function get_types(array){
    let types = array.map( type => type.name);
    return types;
}

module.exports = {
    get_api_data,
    get_db_data,
    get_all_data,
    get_principal,
    get_detail,
    get_types
}