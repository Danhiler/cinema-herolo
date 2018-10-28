export function getData() {
    return async (dispatch) => {
        const res = await fetch('https://www.omdbapi.com/?apikey=2a7ff486&t=' + String.fromCharCode(97 + Math.floor((Math.random() * 24) + 1)));
        const json = await res.json();
        dispatch({ type: "ADD_NEW_MOVIE", data: json })
    }
}
export function updateSelectedMovie(movieObj) {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_SELECTED_MOVIE", data: movieObj })
    }
}
export function updateMovie(updatedMovie) {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_MOVIE", data: updatedMovie })
    }
}
export function createMovie(movieObj) {
    return async (dispatch) => {
        dispatch({ type: "ADD_NEW_MOVIE", data: movieObj })
    }
}
export function deleteMovie(movieID) {
    return async (dispatch) => {
        dispatch({ type: "DELETE_MOVIE", data: movieID })
    }
}