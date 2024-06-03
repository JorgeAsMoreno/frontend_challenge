export const BASEURL = 'https://image.tmdb.org/t/p/original'

export const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_API_KEY
  },
}

export const REQUESTS = {
  baseMovieSearch: 'https://api.themoviedb.org/3/movie/',
  baseTVSeriesSearch: 'https://api.themoviedb.org/3/tv/',
  popularMovieList: 'https://api.themoviedb.org/3/movie/popular',
  topRatedMovies: 'https://api.themoviedb.org/3/movie/top_rated',
  upcomingMovies: 'https://api.themoviedb.org/3/movie/upcoming',
  nowPlaingMovies: 'https://api.themoviedb.org/3/movie/now_playing',
  topRatedmovieList: 'https://api.themoviedb.org/3/movie/top_rated',
  popularTvSeriesList: 'https://api.themoviedb.org/3/tv/popular',
  topRatedTvSeriesList: 'https://api.themoviedb.org/3/tv/top_rated',
  airlingTVSeries: 'https://api.themoviedb.org/3/tv/airing_today',
  onAirTvSeries: 'https://api.themoviedb.org/3/tv/on_the_air',
  allMediaTypes: 'https://api.themoviedb.org/3/trending/all/day',
  getTeaserVideos: (id: number) => `https://api.themoviedb.org/3/movie/${id}/videos`,
  getMovieDetails: (movie_id: number) => `https://api.themoviedb.org/3/movie/${movie_id}`,
  getMovieReviews: (movie_id: number) => `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
  getTvSeriesDetails: (series_id: number) => `https://api.themoviedb.org/3/tv/${series_id}`
}

export const TEASER_OPTIONS = {
  playerVars: {
    autoplay: 0,
  },
}
