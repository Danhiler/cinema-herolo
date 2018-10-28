export default function reducer(state, action) {
    if (action.type === "ADD_NEW_MOVIE") {
        const updatedMovies = state.movies
        updatedMovies.push(action.data)
        return {
            ...state,
            movies: updatedMovies,
            selectedMovie: {}
        }
    }
    if (action.type === "UPDATE_SELECTED_MOVIE") {
        return {
            ...state,
            selectedMovie: action.data
        }
    }
    if (action.type === "UPDATE_MOVIE") {
        const updatedMovies = state.movies
        const index = updatedMovies.findIndex(movie => movie.imdbID === action.data.imdbID)
        updatedMovies[index] = action.data
        return {
            ...state,
            movies: updatedMovies,
            selectedMovie: action.data
        }
    }
    if (action.type === "DELETE_MOVIE") {
        const updatedMovies = state.movies
        const index = updatedMovies.findIndex(movie => movie.imdbID === action.data)

        updatedMovies.splice(index, 1)
        return {
            ...state,
            movies: updatedMovies,
            selectedMovie: {}
        }
    }
    return {
        ...state
    }

}