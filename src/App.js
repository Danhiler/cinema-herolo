import React, { Component } from 'react';
import Movie from './Components/Movie';
import './App.css';
import { connect } from "react-redux";
import { getData, updateSelectedMovie } from "./actions"
import Popup from './Components/Popup';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      activePopUp:"none"
    }
  }
  changePopupState=(newState)=>{
this.setState({activePopUp:newState})
  }
  componentWillMount() {
    for(let i=0;i<10;i++)
    this.props.getData(i)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Welcome to Herolo Cinema 
        </header>
          <i className="addMovie fas fa-plus-circle" onClick={this.handleCreateMovie}></i>
        <div className="main-content">
          {this.printMovies()}
        </div>
        {this.includePopupCode()}
      </div>
    );
  }

  printMovies = () => {
    const movies = this.props.movies
    console.log(movies)
    if (!movies) return "No Movies"
    return movies.map((movie, index) => {
      return <Movie imdbID={movie.imdbID}
        Title={movie.Title}
        Year={movie.Year}
        Runtime={movie.Runtime}
        Genre={movie.Genre}
        Director={movie.Director}
        Poster={movie.Poster}
        key={index}
        handleUpdateSelectedMovie={this.handleUpdateSelectedMovie}
        handleDeleteMovie={this.handleDeleteMovie} />
    })
  }
  includePopupCode = () => {
    return <Popup activePopUp={this.state.activePopUp} changePopupState={this.changePopupState} />
  }
  handleUpdateSelectedMovie = (movieObj) => {
    this.changePopupState("editMovie")
    this.props.updateSelectedMovie(movieObj)
  }
  handleDeleteMovie=(movieID)=>{
    this.changePopupState("areYouSure")
    // this.props.deleteMovie(movieID)
  }
  handleCreateMovie=()=>{
    this.changePopupState("createMovie")
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies,
    selectedMovie: state.selectedMovie
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getData: () => {
      dispatch(getData())
    },
    updateSelectedMovie: (movieObj) => {
      dispatch(updateSelectedMovie(movieObj))
    },

  }
};
const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default connectedApp;
