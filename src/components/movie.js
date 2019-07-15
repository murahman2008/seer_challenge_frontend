import React, { Component } from "react";
import { getMovies, deleteMovieById } from "./../services/movie_service";

class Movie extends Component {
  state = {
    movies: []
  };

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  dispalyMovieCounts = () => {
    let output = <h3>No movie found in the system</h3>;
    if (this.state.movies.length > 0)
      output = (
        <h3>There are {this.state.movies.length} movie(s) in the database</h3>
      );

    return output;
  };

  handleMovieDelete = movieId => {
    deleteMovieById(movieId);
    //console.log(getMovies());
    this.setState({ movies: getMovies() });
  };

  displayMoives = () => {
    let output = null;
    const { movies } = this.state;

    if (movies.length > 0) {
      const movieTable = movies.map(movie => {
        return (
          <tr key={movie.id}>
            <td>{movie.id}</td>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.stock}</td>
            <td>{movie.rate}</td>
            <td>
              <input
                type="button"
                name="delete_btn"
                value="-"
                onClick={() => {
                  return this.handleMovieDelete(movie.id);
                }}
              />
            </td>
          </tr>
        );
      });

      output = (
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Genre</td>
              <td>Stock</td>
              <td>Rate</td>
            </tr>
          </thead>
          <tbody>{movieTable}</tbody>
        </table>
      );
    }

    return output;
  };

  render() {
    return (
      <React.Fragment>
        {this.dispalyMovieCounts()}
        {this.displayMoives()}
      </React.Fragment>
    );
  }
}

export default Movie;
