import React from 'react'

function City({ name, code, day, description }) {
    return (
        <div>
            {/* this is the city component */}
            <h1>{name}</h1>
            <h1>{code}</h1>
            <h1>{day}</h1>
            <h1>{description}</h1>
        </div>
    )
}

export default City