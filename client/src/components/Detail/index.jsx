import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {getDetail, resetDetail} from '../../actions';
import PokeDetail from '../PokeDetail';

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
            <div className={styles.pokemonDetails}>
                <div className={styles.pokemonImg}>
                    <img src={details.image} alt={`${details.name} image`} className={styles.imagen} />
                </div>
                <div className={styles.details}>
                    <PokeDetail name="Name" data={details.name} />
                    <PokeDetail name="Types" data={details.types} />
                    <PokeDetail name="Height" data={details.height} />
                    <PokeDetail name="Weight" data={details.weight} />
                    <PokeDetail name="Hp" data={details.hp} />
                    <PokeDetail name="Attack" data={details.attack} />
                    <PokeDetail name="Defense" data={details.defense} />
                    <PokeDetail name="Speed" data={details.speed} />
                </div>
            </div>
        </div>
    )
}

export default Detail;