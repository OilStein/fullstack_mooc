import React from 'react'


const Filter = (props) => {
  console.log(props);
    return (
        <div>
        filter shown with{" "}
        <input value={props.search} onChange={props.handler}></input>
      </div>
    )
  }

  export default Filter