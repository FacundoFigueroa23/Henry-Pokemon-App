import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {orderPokemonsByName, orderPokemonsByAttack} from '../../actions';

import styles from './order.module.css';

function Order({render}) {
    const dispatch = useDispatch();

    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderPokemonsByName(e.target.value));
        render(`Ordered by name ${e.target.value}`);
    }

    function handleOrderAttack(e){
        e.preventDefault();
        dispatch(orderPokemonsByAttack(e.target.value));
        render(`Ordered by attack ${e.target.value}`);
    }
    return (
        <div className={styles.orderBox}>
            <div>
                <label>Order by name</label>
                <select onChange={(e) => handleOrderName(e)} >
                    <option value="" ></option>
                    <option value="ASC" >ASC</option>
                    <option value="DESC" >DESC</option>
                </select>
            </div>
            <div>
                <label>Order by attack</label>
                <select onChange={(e) => handleOrderAttack(e)}>
                    <option value="" ></option>
                    <option value="ASC" >ASC</option>
                    <option value="DESC" >DESC</option>
                </select>
            </div>
        </div>
    )
}

export default Order;