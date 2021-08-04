import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styles from './searchBar.module.css';

import {getPokemonByName} from '../../actions';

function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    function handleInput(e){
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemonByName(input))
        setInput("");
    }

    return (
        <div className={styles.searchBarBox}>
            <input type="text" placeholder="Search pokemon..." onChange={(e) => handleInput(e)} />
            <button onClick={(e) => handleClick(e)} >Search</button>
        </div>
    )
}

export default SearchBar;