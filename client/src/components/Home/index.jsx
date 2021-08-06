import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './home.module.css';

import {getPokemons} from '../../actions';
import Pagination from '../Pagination';
import Pokemon from '../Pokemon';
import SearchBar from '../SearchBar';
import Filter from '../Filter';
import Order from '../Order';

function Home() {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getPokemons());
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

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    const [orden, setOrden] = useState('');

    return (
        <div className={styles.homeBox}>
            <div className={styles.btnsBox}>
                <button onClick={(e) => handleClick(e)} >Reload pokemons</button>
                <SearchBar />
                <Link to="/create">
                    <button>Create pokemon</button>
                </Link>
            </div>
            <div className={styles.orderAndFilterBox}>
                <Order render={setOrden} />
                <Filter />
            </div>
            <div className={styles.pokemonsBox}>
                {
                    current_pokemons ? current_pokemons.map( poke => (
                        <Link to={`/home/${poke.id}`}>
                            <Pokemon name={poke.name} image={poke.image} types={poke.types} key={poke.id} />
                        </Link>
                    ))
                    : <div>Cargando...</div>
                }
            </div>
            {
                pokemons.length > 1 ? <Pagination pokemons_per_page={pokemons_per_page} total_pokemons={pokemons.length} paginate={paginate} />
                : <br></br>
            }
        </div>
    )
}

export default Home;