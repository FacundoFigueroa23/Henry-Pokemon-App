import React from 'react';

function FormCamp({name, type, value, handle_function, error_control}) {
    return (
        <div>
            <label>{`${name}: `}</label>
            <input type={type} value={value} name={name.toLowerCase()} onChange={handle_function} />
            {
                error_control[name.toLowerCase()] && (
                    <p>{error_control[name.toLowerCase()]}</p>
                )
            }
        </div>
    )
}

export default FormCamp;