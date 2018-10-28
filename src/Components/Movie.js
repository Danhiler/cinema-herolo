import React from 'react'
import './Movie.css'
class Movie extends React.Component {
    render() {
        const { imdbID, Title, Year, Runtime, Genre, Director, Poster } = this.props
        return (<div className="movie-wrapper" style={{ 'backgroundImage': 'url(' + Poster + ')' }} >
            <div className="title">
                <span className="hide"><i className="fas fa-edit" onClick={this.openEditPopup}></i></span>
                <span className="title-text">{Title}</span>
                <span className="hide"><i className="fas fa-trash-alt" onClick={this.openDeletePopup}></i></span>
            </div>
            <div className="hide">{Genre} </div>
            <div className="hide">{Year} </div>
            <div className="hide">{Runtime} </div>
            <div className="hide">{Director} </div>
            <div className="hide">{imdbID} </div>
        </div >)
    }
    openEditPopup = () => {
        this.props.handleUpdateSelectedMovie({ ...this.props })
    }
    openDeletePopup = () => {
        this.props.handleUpdateSelectedMovie({ ...this.props })
        this.props.handleDeleteMovie(this.props.imdbID)

    }
}
export default Movie