import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {get_types, filter_pokemons_by_type, filter_pokemons_by_origin} from '../../../redux/actions';
import {upper_case} from '../../../controllers';

import styles from './filter.module.css';

function Filter() {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(get_types())
    }, [dispatch]);

    const types = useSelector( state => state.types);

    function handle_filter_type(e){
        e.preventDefault();
        dispatch(filter_pokemons_by_type(e.target.value));
    }

    function handle_filter_origin(e){
        e.preventDefault();
        dispatch(filter_pokemons_by_origin(e.target.value));
    }
    return (
        <div className={styles.filter_box}>
            <div>
                <label className={styles.label} >Filter By Type </label>
                <select className={styles.type_select} onChange={handle_filter_type}>
                <option value="All">All</option>
                    {
                        types.map( type => (
                            <option value={type} key={type} >{upper_case(type)}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label className={styles.label} >Filter By Origin </label>
                <select className={styles.origin_select} onChange={handle_filter_origin}>
                    <option value="ALL">All</option>
                    <option value="DB" >Db</option>
                    <option value="API" >Api</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;