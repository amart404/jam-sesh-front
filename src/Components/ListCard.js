import React, { Component } from 'react'
import '../Stylesheets/ListCard.css'

export default class ListCard extends Component {

    addSong = () => {
        const {title, album, artist, genre, picture} = this.props.songInfo

        fetch("http://localhost:3000/songs", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({
                playlist_id: this.props.listId,
                title,
                artist,
                album,
                genre,
                picture
            })
        })
            .then(this.props.hideModal)
    }

    render() {
        return (
            <div className="list-card">
                <h1>{this.props.name}</h1>
                <button onClick={this.addSong}>Select</button>
            </div>
        )
    }
}