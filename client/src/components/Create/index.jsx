import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {get_types, post_pokemon} from '../../actions';
import FormCamp from '../FormCamp';

import styles from './create.module.css';

function Create() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, set_input] = useState({
        name: "",
        height: 0,
        weight: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        image: "",
        types: []
    });
    const [errors, set_errors] = useState({});

    const types = useSelector((state) => state.types);

    useEffect(() => {
        if(types.length === 0) dispatch(get_types());
    }, []);

    function handle_button_home(e){
        e.preventDefault();
        history.push('/home');
    }

    function handle_input_change(e){
        e.preventDefault();
        set_input({
            ...input,
            [e.target.name]: e.target.value
        });
        set_errors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handle_select(e){
        e.preventDefault();
        set_input({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handle_submit(e){
        e.preventDefault(e);
        dispatch(post_pokemon(input));
        alert("¡Pokemon created!");
        set_input({
            name: "",
            height: 0,
            weight: 0,
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            image: "",
            types: []
        })
    }
    return (
        <div className={styles.create_box}>
            <button onClick={handle_button_home} >Home</button>
            <form className={styles.form}>
                <FormCamp name="Name" type="text" value={input.name} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Image" type="url" value={input.image} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Height" type="number" value={input.height} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Weight" type="number" value={input.weight} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Hp" type="number" value={input.hp} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Attack" type="number" value={input.attack} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Defense" type="number" value={input.defense} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Speed" type="number" value={input.speed} handle_function={handle_input_change} error_control={errors} />
                <div>
                    <label>Types: </label>
                    <select onChange={handle_select} >
                        <option></option>
                        {
                            types.map( type => (
                                <option value={type.name} key={type.id} >{type.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    {
                        errors.types && (
                            <p>{errors.types}</p>
                        )
                    }
                    {
                        input.types.map( type => (
                            <p key={type} >{type}</p>
                        ))
                    }
                </div>
                <button type="submit" onClick={handle_submit} >Create pokemon</button>
            </form>
        </div>
    )
}

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Name is required";
    }
    if(input.types.length === 0){
        errors.types = "Types are required";
    }
    return errors;
}

export default Create;