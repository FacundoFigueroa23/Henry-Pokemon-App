import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {resetDetail} from '../../actions';

import styles from './create.module.css';

function Create() {
    const dispatch = useDispatch();

    function handleButtonHome(e){
        e.preventDefault();
        dispatch(resetDetail())
    }
    return (
        <div className={styles.createBox}>
            <Link to="/home" className={styles.btn}>
                <button onClick={(e) => handleButtonHome(e)} >Home</button>
            </Link>
        </div>
    )
}

export default Create;