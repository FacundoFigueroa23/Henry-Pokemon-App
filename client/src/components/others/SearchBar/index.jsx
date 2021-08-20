import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styles from './searchBar.module.css';

import {get_pokemon_by_name} from '../../../redux/actions';

function SearchBar() {
    const dispatch = useDispatch();
    const [input, set_input] = useState("");

    function handle_input(e){
        e.preventDefault();
        set_input(e.target.value);
    }

    function handle_click(e){
        e.preventDefault();
        if(input === ""){
            alert("NAME IS REQUIRED");
        }else{
            dispatch(get_pokemon_by_name(input))
            set_input("");
        }
    }

    return (
        <div className={styles.search_bar_box}>
            <input className={styles.input} type="text" placeholder=" Search pokemon..." onChange={handle_input} />
            <button className={styles.btn} onClick={handle_click} >Search</button>
        </div>
    )
}

export default SearchBar;