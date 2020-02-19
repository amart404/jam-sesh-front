import React from 'react'
import '../Stylesheets/ShowCards.css'

export default function ShowListSongs(props) {
    const {title, picture, album, artist, genre} = props.song

    const getTabs = () => {
        let taburl = `http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${title}&a=${artist}`
        return taburl
    }

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
                <a href={getTabs()} rel="noopener noreferrer" target="_blank" >Find Tabs</a>
            </div>
        </div>
    )
}
