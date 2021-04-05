import { MovieListItem } from '../movieList/MovieListItem'

export const isFavourite = (favourites: MovieListItem[], id: string) =>
  favourites && favourites.filter((f: MovieListItem) => f.id === id).length > 0
