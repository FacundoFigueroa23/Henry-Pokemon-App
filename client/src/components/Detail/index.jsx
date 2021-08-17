import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {upper_case} from '../../controllers';
import {get_detail, reset_detail} from '../../actions';
import PokeDetail from '../PokeDetail';

import styles from './detail.module.css';

function Detail(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(get_detail(props.match.params.id))
    }, [dispatch])

    const details = useSelector((state) => state.detail);

    function handle_button_home(e){
        e.preventDefault();
        dispatch(reset_detail());
        history.push('/home');
    }
    return (
        <div className={styles.detail_box}>
            <button className={styles.btn} onClick={handle_button_home} >Home</button>
            <div className={styles.pokemon_details}>
                <div className={styles.pokemon_img}>
                    <img src={details.image} alt={`${details.name} image`} className={styles.imagen} />
                </div>
                <div className={styles.details}>
                    <PokeDetail name="Id" data={details.id} />
                    <PokeDetail name="Name" data={details.name ? upper_case(details.name) : details.name} />
                    <PokeDetail name="Types" data={details.types ? details.types.map( type => upper_case(type)) : details.types} />
                    <PokeDetail name="Hp" data={details.hp} />
                    <PokeDetail name="Attack" data={details.attack} />
                    <PokeDetail name="Defense" data={details.defense} />
                    <PokeDetail name="Speed" data={details.speed} />
                    <PokeDetail name="Height" data={details.height} />
                    <PokeDetail name="Weight" data={details.weight} />
                </div>
            </div>
        </div>
    )
}

export default Detail;