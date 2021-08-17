import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Pagination from '../Pagination';
import Pokemon from '../Pokemon';
import SearchBar from '../SearchBar';
import Filter from '../Filter';
import Order from '../Order';
import Song from './Pokémon Song.mp3';

import {get_pokemons} from '../../actions';
import styles from './home.module.css';

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [orden, set_orden] = useState('');

    useEffect( () => {
        dispatch(get_pokemons());
    }, []);

    const pokemons = useSelector( state => state.pokemons);
    const pokemons_per_page = 9;
    const [current_page, set_current_page] = useState(1);
    const index_of_last_pokemon = current_page * pokemons_per_page;
    const index_of_first_pokemon = index_of_last_pokemon - pokemons_per_page;
    const current_pokemons = pokemons.slice(index_of_first_pokemon, index_of_last_pokemon);
    function paginate(page_number){
        set_current_page(page_number);
    }

    function handle_click(e){
        e.preventDefault();
        dispatch(get_pokemons());
    }

    function create_pokemon_btn(e){
        e.preventDefault();
        history.push('/create');
    }

    return (
        <div className={styles.home_box}>

            <h1 className={styles.title} >HENRY POKEMON</h1>

            <div className={styles.btns_box}>
                <button className={styles.btn}  onClick={handle_click} >Reload Pokemons</button>
                <SearchBar />
                <button className={styles.btn} onClick={create_pokemon_btn} >Create Pokemon</button>
            </div>

            <div className={styles.order_and_filter_box}>
                <Order set_page={set_current_page} page={current_page} render={set_orden} />
                <Filter />
            </div>

            <div className={styles.pokemons_box}>
                {
                    pokemons.length !== 0 ? current_pokemons.map( poke => (
                        typeof poke === 'object' ? <Pokemon id={poke.id} name={poke.name} image={poke.image} types={poke.types} key={poke.id} />
                        : <h3 className={styles.error} >{poke}</h3>
                    ))
                    : <h3 className={styles.loading} >Loading...</h3>
                }
            </div>

            {
                pokemons.length > pokemons_per_page ? <Pagination pokemons_per_page={pokemons_per_page} total_pokemons={pokemons.length} paginate={paginate} />
                : <br></br>
            }

            <audio src={Song} controls autoPlay loop className={styles.audio} />
            
        </div>
    )
}

export default Home;