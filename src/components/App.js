import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./Moviecard";
import React from "react";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      this.forceUpdate();
    });

    store.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState().movies;
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  };

  setShowFavourite = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies,search } = this.props.store.getState(); //{movies:{},search:{}}
    const { list, favourites, showFavourites } = movies

    const display = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar store={this.props.store} search={search}/>
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
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
