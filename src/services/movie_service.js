let movies = [
  {
    id: 1,
    title: "Moive 1",
    genre: { id: 1, name: "Action" },
    stock: 6,
    rate: 6.5,
    created: "2019-06-14 15:00:00"
  },
  {
    id: 2,
    title: "Moive 2",
    genre: { id: 1, name: "Action" },
    stock: 5,
    rate: 5.5,
    created: "2019-06-14 15:00:00"
  },
  {
    id: 3,
    title: "Moive 3",
    genre: { id: 2, name: "Comedy" },
    stock: 4,
    rate: 4.5,
    created: "2019-06-14 15:00:00"
  },
  {
    id: 4,
    title: "Moive 4",
    genre: { id: 2, name: "Comedy" },
    stock: 3,
    rate: 3.5,
    created: "2019-06-14 15:00:00"
  },
  {
    id: 5,
    title: "Moive 5",
    genre: { id: 1, name: "Action" },
    stock: 2,
    rate: 2.5,
    created: "2019-06-14 15:00:00"
  }
];

export function getMovies() {
  return movies;
}

export function getMovieById(id) {
  const result = movies.find(movie => {
    return movie.id === id;
  });

  return result;
}

export function deleteMovieById(movieId) {
  movies = movies.filter(movie => {
    return movie.id !== movieId;
  });

  return true;
}
