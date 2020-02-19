import React from 'react'
import '../Stylesheets/ShowUserLists.css'

export default function ShowUserLists (props) {
    return (
        <div className="all-user-lists">
            <h1>{props.name}</h1>
            <button onClick={() => props.openUser(props.listId)}>Select</button>
        </div>
    )
}