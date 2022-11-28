import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./Moviecard";
import React from "react";
import { addMovies, setShowFavourites } from "../actions";
// import {connect} from '../index';
import {connect} from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.movies;
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  };

  setShowFavourite = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies,search } = this.props; //{movies:{},search:{}}
    const { list, favourites, showFavourites } = movies;
    const display = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => {
                this.setShowFavourite(false);
              }}
            >
              movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => {
                this.setShowFavourite(true);
              }}
            >
              Favourites
            </div>
          </div>

          <div className="List">
            {display.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
             {display.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;

