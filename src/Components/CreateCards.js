import React from 'react'
import '../Stylesheets/CreateCards.css'

import ShowCards from './ShowCards'

export default function CreateCards(props) {
    const $songs = props.songs.map(song => {
        return <li key={song.id}>
            <ShowCards 
                song={song}
                getSong={props.getSong}
            />
        </li>
    })
    
    return (
        <ul>{$songs}</ul>
    )
}
