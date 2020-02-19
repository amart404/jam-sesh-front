import React, { Component } from 'react'
import ListCard from './ListCard'

export default class GetPlaylists extends Component {
    state = {
        allLists: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/playlists", {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(playlists => {
                let $playlists = playlists.filter(list => {
                    return list.user_id == localStorage.getItem('id')
                })
                this.setState({
                    allLists: $playlists
                })
            })
    }

    showLists = () => {
        return this.state.allLists.map(list => {
            return <li key={list.id} id="single-list">
                <ListCard 
                    hideModal={this.props.hideModal}
                    listId={list.id}
                    name={list.name}
                    songInfo={this.props.songInfo}
                />
            </li>
        })
    }
        
    render() {
        return (
            <div className="modal-window">
                <ul>{this.showLists()}</ul>
                <input id="playlist-name" type="text" placeholder="New Playlist Name"/>
                <button id="new" onClick={this.props.newPlaylist}>New Playlist</button>
                <button id="cancel" onClick={this.props.hideModal}>Cancel</button>
            </div>
        )
    }
}
