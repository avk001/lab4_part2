import React from 'react'

function ListDaysSteps(props) {
    const data = props.data;

    return (
        <ul>
            {
                data.map(d=>
                <li key={d.id}>
                    <p>{d.date}</p>
                    <p>{d.distance}</p>
                    <button >Del</button>
                </li>
            )}
        </ul>
    )
}
/*onClick={() => handleRemove(d.id)}*/

export default ListDaysSteps