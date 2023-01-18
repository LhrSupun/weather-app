import React from 'react'

function City({ name, color, description, code, dateTime }) {

    return (
        <>
            <div className={`${color}`} >
                {/* this is the city component */}
                <h1>name:{name}</h1>
                <h1>code:{code}</h1>
                <h1>description:{description}</h1>
                <h1>dateTime:{dateTime()}</h1>
            </div >
        </>
    )
}

export default City