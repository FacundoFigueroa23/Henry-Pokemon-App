import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {getDetail, resetDetail} from '../../actions';

import styles from './detail.module.css';

function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const details = useSelector((state) => state.detail);

    function handleButtonHome(e){
        e.preventDefault();
        dispatch(resetDetail())
    }
    return (
        <div className={styles.detailBox}>
            <Link to="/home" className={styles.btn}>
                <button onClick={(e) => handleButtonHome(e)} >Home</button>
            </Link>
        </div>
    )
}

export default Detail;