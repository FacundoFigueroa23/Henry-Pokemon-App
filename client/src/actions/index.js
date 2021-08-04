import axios from 'axios';
import {GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_ATTACK} from './names';

export function getPokemons(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/pokemons");
        return dispatch({type: GET_POKEMONS, payload: response.data});
    }
}

export function getPokemonByName(name){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/pokemons?name=" + name);
        return dispatch({type: GET_POKEMON_BY_NAME, payload: response.data});
    }
}

export function getTypes(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/types");
        return dispatch({type: GET_TYPES, payload: response.data});
    }
}

export function filterPokemonsByType(pokemon_type){
    return {type: FILTER_BY_TYPE, payload: pokemon_type}
}

export function filterPokemonsByOrigin(origin){
    return {type: FILTER_BY_ORIGIN, payload: origin}
}

export function orderPokemonsByName(order){
    return {type: ORDER_BY_NAME, payload: order}
}

export function orderPokemonsByAttack(order){
    return {type: ORDER_BY_ATTACK, payload: order}
}