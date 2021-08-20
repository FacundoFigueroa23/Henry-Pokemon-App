import React from 'react';
import styles from './pokeDetail.module.css';

function PokeDetail({name, data}) {
    return (
        <div className={styles.detail}>
            <label className={styles.name}>{`${name}: `}</label>
            <label className={styles.data}>{data}</label>
        </div>
    )
}

export default PokeDetail;