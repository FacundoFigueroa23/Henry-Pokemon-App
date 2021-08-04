import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTypes, filterPokemonsByType, filterPokemonsByOrigin} from '../../actions';

import styles from './filter.module.css';

function Filter() {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTypes())
    }, [dispatch]);

    const types = useSelector( state => state.types);

    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
    }

    function handleFilterOrigin(e){
        e.preventDefault();
        dispatch(filterPokemonsByOrigin(e.target.value));
    }
    return (
        <div className={styles.filterBox}>
            <div>
                <label>Filter by type</label>
                <select onChange={(e) => handleFilterType(e)}>
                    <option></option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.id} >{type.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label>Filter by origin</label>
                <select onChange={(e) => handleFilterOrigin(e)}>
                    <option></option>
                    <option value="DB" >DB</option>
                    <option value="API" >API</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;