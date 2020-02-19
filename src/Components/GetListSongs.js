import React, { Component } from 'react'
import '../Stylesheets/GetListSongs.css'

import ShowListSongs from './ShowListSongs'

export default class UserSongs extends Component {
    state = {
        allSongs: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/songs", {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(songs => {
                let $songs = songs.filter(song => {
                    return song.playlist_id == this.props.listId
                })
                this.setState({
                    allSongs: $songs
                })
            })
    }

    getSongs = () => {
        return this.state.allSongs.map(song => {
            return <li key={song.id}>
                <ShowListSongs
                    song={song}
                />
            </li>
        })
    }

    render() {
        return (
            <div className="user-songs">
                <ul id="song-list">{this.getSongs()}</ul>
                <button id="close-list" onClick={this.props.closeUser}>Close</button>
            </div>
        )
    }
}