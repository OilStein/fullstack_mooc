import React from 'react'

const CountryInput = (props) => {
    return (
        <div>
            find countries
            <input value={props.value} onChange={props.handleSearchInput}></input>
        </div>
    )
}



export default CountryInput