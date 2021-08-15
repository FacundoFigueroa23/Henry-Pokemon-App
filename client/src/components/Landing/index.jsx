import React from 'react';
import {Link} from 'react-router-dom';
import styles from './landing.module.css';

function Landing() {
    return (
        <div className={styles.landing_box}>
            <div className={styles.landing_title}>
                <label>Welcome to Henry Pokemon!</label>
            </div>
            <Link to="/home" >
                <button className={styles.landing_btn}>Enter</button>
            </Link>
        </div>
    )
}

export default Landing;