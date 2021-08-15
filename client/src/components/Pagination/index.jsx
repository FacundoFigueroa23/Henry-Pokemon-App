import React from 'react';
import styles from './pagination.module.css';

function Pagination({pokemons_per_page, total_pokemons, paginate}) {
    let page_numbers = [];
    for(let number=1; number<=Math.ceil(total_pokemons/pokemons_per_page); number++){
        page_numbers.push(number);
    }
    return (
        <nav className={styles.pagination_box}>
            {
                page_numbers.map( number => (
                    <button className={styles.btn} key={number} onClick={ () => paginate(number)} >{number}</button>
                ))
            }
        </nav>
    )
}

export default Pagination;