import React from 'react';
import styles from './formCamp.module.css';

function FormCamp({name, type, value, handle_function, error_control}) {
    return (
        <div className={styles.formCamp_container} >
            <div className={styles.formCamp_box} >
                <label className={styles.label} >{`${name}: `}</label>
                <input className={styles.input_camp} type={type} value={value} name={name.toLowerCase()} onChange={handle_function} />
            </div>
            {
                error_control[name.toLowerCase()] && (
                    <p className={styles.error} >{error_control[name.toLowerCase()]}</p>
                )
            }
        </div>
        
    )
}

export default FormCamp;