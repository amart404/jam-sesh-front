import React, { Component } from 'react'
import '../Stylesheets/ShowCards.css'

export default class ShowCards extends Component {
    getTabs = () => {
        const {title, artist} = this.props.song
        let taburl = `http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${title}&a=${artist}`
        return taburl
    }
    
    render() {
        const {title, picture, album, artist, genre} = this.props.song
        return (
            <div className="song-card">
                <h2 id="song-title">{title}</h2>
                <img src={picture} alt="Sorry, no album art :(" id="song-picture"/>
                <div className="song-info">
                    <h3 id="song-album">{album}</h3>
                    <p id="song-artist">{artist}</p>
                    <p id="song-genre">{genre}</p>
                </div>
                <div className="song-actions">
                    <button onClick={() => this.props.getSong(this.props.song)}>Add to Playlist</button>
                    <br></br>
                    <a href={this.getTabs()} rel="noopener noreferrer" target="_blank" >Find Tabs</a>
                </div>
            </div>
        )
    }
}