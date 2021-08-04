import React from 'react';
import styles from './pokemon.module.css';

function Pokemon({name, image, types}) {
    return (
        <div className={styles.pokemonCard}>
            <div className={styles.imgBox}>
                <img src={image} alt={`${name} image`} />
            </div>
            <div className={styles.nameBox}>
                <label>{name}</label>
            </div>
            <div className={styles.typesBox}>
                <label>{types}</label>
            </div>
        </div>
    )
}

export default Pokemon;