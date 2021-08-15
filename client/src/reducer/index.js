import {GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_ATTACK,
GET_DETAIL, RESET_DETAIL, POST_POKEMON} from '../actions/names';

const initial_state = {
    pokemons: [],
    all_pokemons: [],
    types: [],
    detail: {}
};

function reducer(state = initial_state, action){

    switch (action.type) {

        case FILTER_BY_ORIGIN:
            let pokemons_filtered_by_origin;
            if(action.payload === "DB"){
                pokemons_filtered_by_origin = state.all_pokemons.filter( poke => poke.hasOwnProperty("create"));
            }else if(action.payload === "API"){
                pokemons_filtered_by_origin = state.all_pokemons.filter( poke => !poke.hasOwnProperty("create"));
            }else{
                pokemons_filtered_by_origin = state.all_pokemons;
            }
            return {
                ...state,
                pokemons: pokemons_filtered_by_origin
            }
        
        case FILTER_BY_TYPE:
            let pokemons_filtered_by_type;
            if(action.payload === "All"){
                pokemons_filtered_by_type = state.all_pokemons;
            }else{
                pokemons_filtered_by_type = state.all_pokemons.filter( poke => poke.types.includes(action.payload));
            }
            return {
                ...state,
                pokemons: pokemons_filtered_by_type
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                all_pokemons: action.payload
            }

        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case ORDER_BY_ATTACK:
            let pokemons_ordered_by_attack;
            if(action.payload === "ASC"){
                pokemons_ordered_by_attack = state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return 1;
                    if(a.attack < b.attack) return -1;
                    return 0;
                });
            }else if(action.payload === "DESC"){
                pokemons_ordered_by_attack = state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return -1;
                    if(a.attack < b.attack) return 1;
                    return 0;
                });
            }
            return {
                ...state,
                pokemons: pokemons_ordered_by_attack
            }
            
        case ORDER_BY_NAME:
            let pokemons_ordered_by_name;
            if(action.payload === "ASC"){
                pokemons_ordered_by_name = state.pokemons.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                });
            }else if(action.payload === "DESC"){
                pokemons_ordered_by_name = state.pokemons.sort((a, b) => {
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                });
            }
            return {
                ...state,
                pokemons: pokemons_ordered_by_name
            }
        
        case POST_POKEMON:
            return {
                ...state
            }

        case RESET_DETAIL:
            return {
                ...state,
                detail: {}
            }

        default:
            return state;
    }
}

export default reducer;