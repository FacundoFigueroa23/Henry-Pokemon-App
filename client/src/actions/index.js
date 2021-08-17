import axios from 'axios';
import {GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_ATTACK,
GET_DETAIL, RESET_DETAIL, POST_POKEMON, RELOAD_POKEMONS} from './names';
import {DEFAULT_IMAGE} from '../constants';

export function filter_pokemons_by_origin(origin){
    return {type: FILTER_BY_ORIGIN, payload: origin}
}

export function filter_pokemons_by_type(pokemon_type){
    return {type: FILTER_BY_TYPE, payload: pokemon_type}
}

export function get_detail(id){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/pokemons/" + id);
        return dispatch({type: GET_DETAIL, payload: response.data});
    }
}

export function get_pokemons(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/pokemons");
        return dispatch({type: GET_POKEMONS, payload: response.data});
    }
}

export function get_pokemon_by_name(name){
    try{
        return async function(dispatch){
            try{
                const response = await axios.get("http://localhost:3001/pokemons?name=" + name);
                return dispatch({type: GET_POKEMON_BY_NAME, payload: [response.data]});
            }catch(e){
                return dispatch({type: GET_POKEMON_BY_NAME, payload: []});
            }
        }
    }catch(e){
        console.log("Falló get_pokemon_by_name");
    }
}

export function get_types(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/types");
        return dispatch({type: GET_TYPES, payload: response.data});
    }
}

export function order_pokemons_by_attack(order){
    return {type: ORDER_BY_ATTACK, payload: order}
}

export function order_pokemons_by_name(order){
    return {type: ORDER_BY_NAME, payload: order}
}

export function post_pokemon(payload){
    return async function(dispatch){
        if(payload.image === ""){
            payload.image = DEFAULT_IMAGE.default;
        }
        const response = await axios.post("http://localhost:3001/pokemon", payload);
        return dispatch({type: POST_POKEMON, payload: response.data});
    }
}

export function reload_pokemons(){
    return {type: RELOAD_POKEMONS}
}

export function reset_detail(){
    return {type: RESET_DETAIL}
}