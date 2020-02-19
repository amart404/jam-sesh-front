import React, { Component } from 'react';
import './App.css';

import SearchBox from './Components/SearchBox'
import CreateCards from './Components/CreateCards'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import GetPlaylists from './Components/GetPlaylists';
import GetUserLists from './Components/GetUserLists'

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const BASE_URL = `https://itunes.apple.com/search?term=`

class App extends Component {
  state = {
    searchTerm: "",
    searchResults: [],
    userInfo: {
      name: '',
      email: '',
      password: ''
    },
    songInfo: {
      title: '',
      artist: '',
      album: '',
      genre: '',
      picture: ''
    },
    loginStatus: false,
    modal: false
  }

  updateSearchTerm = event => {
    let termFont = (event.target.value).split(' ').join('+')

    this.setState({
      searchTerm: termFont
    })
  }

  searchMusic = event => {
    event.preventDefault()
    fetch(`${BASE_URL}${this.state.searchTerm}&media=music`)
      .then(resp => resp.json())
      .then(info => {
        let songInfo = info.results.map(song => {
          return ({
            id: song.trackId,
            artist: song.artistName, 
            album: song.collectionName, 
            title: song.trackName,
            genre: song.primaryGenreName,
            picture: song.artworkUrl100
          })
        })
        this.setState({
          searchResults: songInfo
        })
      })
  }

  clearSearch = () => {
    let box = document.getElementById("search-box")
    box.value = ''
  }

  getNewUser = event => {
    event.preventDefault()

    let name = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirm = document.getElementById("confirm").value

    if (password === confirm) {
      this.setState({
        userInfo: {
          name,
          email,
          password
        }
      })

      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
        .then(this.logIn(event, email, password))
        .catch(error => {
          console.error(error.message)
        })
    }
  }

  logIn = (event, email, password) => {
    event.preventDefault()

    fetch("http://localhost:3000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
      .then(resp => resp.json())
      .then(info => this.handleResponse(info))
      .catch(error => {
        console.error(error.message)
        localStorage.clear()
      })
  }

  handleResponse = (response) => {
    if(response.auth_token) {
      localStorage.setItem('token', response.auth_token.token)
      localStorage.setItem('id', response.auth_token.user_id)

      this.changeLogin()
    } else {
      this.setState({
        userInfo: {
          name: '',
          email: '',
          password: ''
        }
      })
    }
  }

  getEmail = () => {
    let email = document.getElementById("login-email").value

    return email
  }

  getPassword = () => {
    let password = document.getElementById("login-password").value

    return password
  }

  changeLogin = () => {
    this.setState({
      loginStatus: !this.state.loginStatus
    })
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      loginStatus: false
    })
  }

  showModal = () => {
    this.setState({
      modal: true
    })
  }

  hideModal = () => {
    this.setState({
      modal: false
    })
  }

  newPlaylist = () => {
    this.hideModal()

    let newName = document.getElementById("playlist-name").value

    fetch("http://localhost:3000/playlists", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('id'),
        name: newName
      })
    })
      .then(this.showModal)
  }

  getSong = (song) => {
    this.setState({
      songInfo: song
    })

    this.showModal()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/">
            <Login 
              logIn={this.logIn}
              getEmail={this.getEmail}
              getPassword={this.getPassword}
              logout={this.logout}
              hideModal={this.hideModal}
            />
            {
              this.state.loginStatus
                ? <Redirect to="/home" />
                : <Redirect to="/" />
            }
          </Route>
          <Route path="/create">
            <SignUp getNewUser={this.getNewUser}/>
            {
              this.state.loginStatus
                ? <Redirect to="/home" />
                : null
            }
          </Route>
          <Route path="/home">
            <main>
              <header className="home-header">
                <div className="empty-div">
                </div>
                <SearchBox 
                  updateSearchTerm={this.updateSearchTerm} 
                  searchMusic={this.searchMusic}
                  clearSearch={this.clearSearch}
                />
                <div className="user-links">
                  <Link to="/about">About</Link>
                  <Link to="/user-playlist">Playlists</Link>
                  <Link to="/">Logout</Link>
                </div>
              </header>
              {
                this.state.modal 
                  ? <GetPlaylists 
                      hideModal={this.hideModal}
                      newPlaylist={this.newPlaylist}
                      songInfo={this.state.songInfo}
                    />
                  : null
              }
              <section className="results">
                <CreateCards 
                  songs={this.state.searchResults}
                  getSong={this.getSong}
                />
              </section>
            </main>
          </Route>
          <Route path="/about">
            <div className="about">
              <h1>About</h1>
              <p>
                Put your ideal playlist together and save to share with others. <br/>
                All search results include song title, artist name, album title, album artwork, and genre. <br/>
                Each song also comes with a built in link that takes you to a guitar tablature page for that song. <br/>
                So start searching, and put together the ultimate Jam Sesh!
              </p>
            </div>
          </Route>
          <Route path="/user-playlist">
            <div className="users-playlists">
              <GetUserLists />
            </div>
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;