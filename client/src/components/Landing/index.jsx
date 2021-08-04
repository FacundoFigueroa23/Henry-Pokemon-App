import React from 'react';
import {Link} from 'react-router-dom';
import styles from './landing.module.css';

function Landing() {
    return (
        <div className={styles.landingBox}>
            <div className={styles.landingTitle}>
                <label>Welcome to Henry Pokemon!</label>
            </div>
            <Link to="/home" >
                <button className={styles.landingBtn}>Enter</button>
            </Link>
        </div>
    )
}

export default Landing;