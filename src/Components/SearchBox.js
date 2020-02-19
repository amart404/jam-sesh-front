import React from 'react'
import '../Stylesheets/SearchBox.css'

export default function SearchBox(props) {
    return (
        <div className="search">
            <form onSubmit={props.searchMusic}>
                <label htmlFor="search-box">Jam Sesh</label>
                <br/>
                <input 
                    type="text"
                    placeholder="Enter Artist Name"
                    id="search-box"
                    onChange={props.updateSearchTerm}
                />
                <br/>
                <input type="submit" id="sub-button" value="Search" onClick={props.clearSearch} />
            </form>
        </div>
    )
}