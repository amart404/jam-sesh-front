import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Stylesheets/GetUserLists.css'

import ShowUserLists from './ShowUserLists'
import GetListSongs from './GetListSongs'

export default class GetUserLists extends Component {
    state = {
        userLists: [],
        userModal: false,
        userList: null
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
                    userLists: $playlists
                })
            })
    }

    getLists = () => {
        return this.state.userLists.map(list => {
            return <li key={list.id}>
                <ShowUserLists
                    listId={list.id}
                    name={list.name}
                    openUser={this.openUser}
                />
            </li>
        })
    }

    openUser = (id) => {
        this.setState({
            userModal: true,
            userList: id
        })
    }

    closeUser = () => {
        this.setState({
            userModal: false
        })
    }

    render() {
        return (
            <div className="list-page">
                <header id="list-header">
                    <div id="list-empty">
                    </div>
                    <div id="list-title">
                        <h1>User Playlists</h1>
                    </div>
                    <div id="list-home">
                        <Link to="/home">Home</Link>
                    </div>
                </header>
                {
                    this.state.userModal
                        ? <GetListSongs
                            listId={this.state.userList}
                            closeUser={this.closeUser}
                        />
                        : null
                }
                <ul>{this.getLists()}</ul>
            </div>
        )
    }
}