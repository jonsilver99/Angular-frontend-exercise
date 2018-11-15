interface Movie {
    Title: string,
    Year: string | number,
    imdbID: string,
    Type: string | number,
    Poster: string,
}

interface AppState {
    MovieList?: Movie[],
    EditMovie?: Movie,
    DeleteMovie?: Movie,
    CreateNewMovie?: boolean
}