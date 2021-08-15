import React from 'react';
import { useHistory } from 'react-router-dom';
import {upper_case} from '../../controllers';
import styles from './pokemon.module.css';

function Pokemon({id, name, image, types}) {
    const history = useHistory();

    function handle_click(e){
        e.preventDefault();
        history.push(`/home/${id}`);
    }
    return (
        <div className={styles.pokemon_card}>
            <img className={styles.img} src={image} alt={`${name} image`} />
            <div className={styles.name} >
                <label>{upper_case(name)}</label>
            </div>
            <div className={styles.types} >
                <label>{types && typeof types[0] === 'string'? types.map( type => upper_case(type)) : types.map(obj => obj.name)}</label>
            </div>
            <button className={styles.details_btn} onClick={handle_click} >Details</button>
        </div>
    )
}

export default Pokemon;