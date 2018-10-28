import React from "react";
import './Popup.css'
import FormField from "./FormField";
import uuid from "uuid/v1";
import { connect } from "react-redux";
import { updateMovie } from "../reduxActions"
import { createMovie, deleteMovie } from "../reduxActions"

import { hidePopup, showPopup } from '../popupControllers'

class PopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMsg: "empty"
        }
    }

    render() {
        return (<div className="popupWrapper">
            {this.printPopUp()}
        </div>)
    }
    printPopUp = () => {
        switch (this.props.activePopUp) {
            case "none":
                return <div></div>;
            case "editMovie":
                showPopup()
                return this.showEditMoviePopup()
            case "areYouSure":
                showPopup()
                return this.showAreYyouSurePopup()
            case "createMovie":
                showPopup()
                return this.showCreateMoviePopup()
            default:
                return <div></div>

        }
    }
    showAreYyouSurePopup = () => {
        return (<div className="popupWindow smaller-popup">
            <span>Are you sure?</span>
            <div className="form-btns">
                <span className="save-btn" onClick={this.handleDelete}>Yes</span>
                <span className="cancel-btn" onClick={this.handleCancel}>Cancel</span>

            </div>
        </div>)

    }
    showEditMoviePopup = () => {
        const { Title, Year, Runtime, Genre, Director } = this.props.selectedMovie
        return (
            <div className="popupWindow">
                <span>Edit Movie</span>
                {this.printErrorMessege()}
                <div className="editForm">
                    <FormField label="Title" value={Title} />
                    <FormField label="Year" value={Year} />
                    <FormField label="Runtime" value={Runtime} />
                    <FormField label="Genre" value={Genre} />
                    <FormField label="Director" value={Director} />
                    <div className="form-btns">
                        <span className="save-btn" onClick={this.handleSave}>Save</span>
                        <span className="cancel-btn" onClick={this.handleCancel}>Cancel</span>
                    </div>
                </div></div>

        )
    }
    showCreateMoviePopup = () => {
        return (
            <div className="popupWindow">
                <span>Create A Movie</span>
                {this.printErrorMessege()}
                <div className="editForm">
                    <FormField label="Title" value={""} />
                    <FormField label="Year" value={""} />
                    <FormField label="Runtime" value={""} />
                    <FormField label="Genre" value={""} />
                    <FormField label="Director" value={""} />
                    <div className="form-btns">
                        <span className="save-btn" onClick={this.handleCreate}>Create</span>
                        <span className="cancel-btn" onClick={this.handleCancel}>Cancel</span>
                    </div>
                </div></div>
        )
    }
    printErrorMessege = () => {
        let opaciityStyle = ''
        if (this.state.errorMsg !== "empty") {
            opaciityStyle += '1'
        } else {
            opaciityStyle += '0'
        }
        return <div className="error-messege" style={{ opacity: opaciityStyle }}>{this.state.errorMsg} </div>
    }
    handleDelete = () => {
        this.props.deleteMovie(this.props.selectedMovie.imdbID)
        this.closePopup()
    }
    handleSave = () => {
        const updateMovie = this.getTextFields()
        updateMovie.imdbID = this.props.selectedMovie.imdbID
        updateMovie.Poster = this.props.selectedMovie.Poster

        const formValidation = this.validateForm(updateMovie)
        if (formValidation.status) {
            updateMovie.Title = this.convertToValidString(updateMovie.Title)
            this.props.UpdateMovie(updateMovie)
            this.closePopup()
        } else {
            this.setState({ errorMsg: formValidation.msg })
        }

    }
    handleCreate = () => {
        const createdMovie = this.getTextFields()
        createdMovie.imdbID = uuid()
        createdMovie.Poster = "./imageUnavailable.jpg"

        const formValidation = this.validateForm(createdMovie)
        if (formValidation.status) {
            createdMovie.Title = this.convertToValidString(createdMovie.Title)
            this.props.createMovie(createdMovie)

            this.closePopup()
        } else {
            this.setState({ errorMsg: formValidation.msg })
        }
    }
    closePopup = () => {
        hidePopup()
        this.props.changePopupState('none')
        this.setState({ errorMsg: "empty" })
    }
    validateForm = (movieObj) => {
        console.log(movieObj.Year)
        if (movieObj.Title === "") return { status: false, msg: "Please fill a Title" }
        if (movieObj.Year === "") return { status: false, msg: "Please fill a Year" }
        if (!(+movieObj.Year > 1800 && +movieObj.Year < 2020)) return { status: false, msg: "Please fill a valid Year" }
        if (movieObj.Runtime === "") return { status: false, msg: "Please fill the Runtime" }
        if (movieObj.Genre === "") return { status: false, msg: "Please fill a Genre" }
        if (movieObj.Director === "") return { status: false, msg: "Please fill a Director" }
        if (this.isTitleExsist(movieObj.Title)) return { status: false, msg: "Title is already Taken" }
        return { status: true }
    }
    isTitleExsist = (newTitleStr) => {
        console.log("HI", newTitleStr, this.props.selectedMovie.Title)
        if (newTitleStr !== this.props.selectedMovie.Title) {// title have chahnged
            if (this.props.movies.findIndex(movie => movie.Title === newTitleStr) !== -1) {
                return true
            }
        }
        return false;
    }
    handleCancel = () => {
        this.closePopup()
    }
    getTextFields = () => {
        return {
            Title: document.querySelector('.field-Title').value,
            Year: document.querySelector('.field-Year').value,
            Runtime: document.querySelector('.field-Runtime').value,
            Genre: document.querySelector('.field-Genre').value,
            Director: document.querySelector('.field-Director').value,
        }

    }
    convertToValidString = (titleStr) => {
        titleStr = titleStr.replace(/[^0-9a-z ]/gi, '')//remove non alphanumeric chars

        console.log(titleStr)
        var splitStr = titleStr.toLowerCase().split(' ');//convert to Title case
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        console.log(splitStr)
        return splitStr.join(' ');
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
        UpdateMovie: (updatedMovie) => {
            dispatch(updateMovie(updatedMovie))
        },
        deleteMovie: (movieID) => {
            dispatch(deleteMovie(movieID))
        },
        createMovie: (movieObj) => {
            dispatch(createMovie(movieObj))
        },
    }
};
const connectedPopup = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PopUp)

export default connectedPopup;
