import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {get_types, post_pokemon} from '../../actions';
import FormCamp from '../FormCamp';
import {upper_case} from '../../controllers';

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

    function handle_type_btn(e){
        e.preventDefault();
        set_input({
            ...input,
            types: input.types.filter(type => type !== e.target.value)
        });
    }

    function handle_submit(e){
        e.preventDefault(e);
        if(errors){
            for (const error in errors) {
                alert(errors[error]);
            }
        }else{
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
    }
    return (
        <div className={styles.create_box}>
            <button className={styles.btn} onClick={handle_button_home} >Home</button>
            <form className={styles.form}>
                <FormCamp name="Name" type="text" value={input.name} handle_function={handle_input_change} error_control={errors} />
                <div>
                    <label className={styles.label} >Types: </label>
                    <select className={styles.type_select} onChange={handle_select} >
                        <option></option>
                        {
                            types.map( type => (
                                <option value={type.name} key={type.id} >{upper_case(type.name)}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    {
                        errors.types && errors.types.length === 0 ? (
                            <p>{errors.types}</p>
                        ) : console.log()
                    }
                    {
                        input.types.map( type => (
                            <button onClick={handle_type_btn} className={styles.type_btn} value={type} key={type} >{upper_case(type)}</button>
                        ))
                    }
                </div>
                <FormCamp name="Image" type="url" value={input.image} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Hp" type="number" value={input.hp} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Attack" type="number" value={input.attack} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Defense" type="number" value={input.defense} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Speed" type="number" value={input.speed} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Height" type="number" value={input.height} handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Weight" type="number" value={input.weight} handle_function={handle_input_change} error_control={errors} />
                <button className={styles.submit_btn} type="submit" onClick={handle_submit} >Create Pokemon</button>
            </form>
        </div>
    )
}

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Name is required";
    }
    if(input.hp < 0){
        errors.hp = "Hp can't be negative";
    }
    if(input.attack < 0){
        errors.attack = "Attack can't be negative";
    }
    if(input.defense < 0){
        errors.defense = "Defense can't be negative";
    }
    if(input.speed < 0){
        errors.speed = "Speed can't be negative";
    }
    if(input.height < 0){
        errors.height = "Height can't be negative";
    }
    if(input.weight < 0){
        errors.weight = "Weight can't be negative";
    }
    return errors;
}

export default Create;