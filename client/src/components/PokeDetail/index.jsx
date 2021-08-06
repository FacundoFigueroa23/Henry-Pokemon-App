import React from 'react';
import styles from './pokeDetail.module.css';

function PokeDetail({name, data}) {
    return (
        <div className={styles.detail}>
            <label className={styles.name}>{`${name}: `}</label>
            <h3 className={styles.data}>{data}</h3>
        </div>
    )
}

export default PokeDetail;