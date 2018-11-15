import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";

export class Store {

    private InitialState: AppState = {}
    private Subject: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(this.InitialState)
    private Store = this.Subject.asObservable().distinctUntilChanged();

    get currentState() {
        return this.Subject.value
    }

    select<T>(propName: string[]): Observable<T> {
        return this.Store.pluck(...propName)
    }

    set(propName: string, state: any) {
        this.Subject.next({
            ...this.currentState, [propName]: state
        })
    }

    // actions
    appendMovies(newMovies: Movie[]) {
        debugger;
        let oldMovieList = this.currentState.MovieList;
        let newState = Array.isArray(oldMovieList) ? [...oldMovieList, ...newMovies] : newMovies
        this.set('MovieList', newState)
    }

    editMovie(movieToEdit: Movie, editedMovie: Movie) {
        let newState = this.currentState.MovieList.map((movie: Movie, i) => {
            return (movie == movieToEdit) ? editedMovie : movie
        })
        this.set('MovieList', newState)
    }

    deleteMovie(movieToDelete: Movie) {
        let index = this.currentState.MovieList.indexOf(movieToDelete)
        let newState = [
            ...this.currentState.MovieList.slice(0, index),
            ...this.currentState.MovieList.slice(index + 1)
        ]
        this.set('MovieList', newState)
    }

    createNewMovie(movie: Movie) {
        let newState = [...this.currentState.MovieList, movie]
        this.set('MovieList', newState)        
    }

    checkIfMovieTitleExists(movie: Movie) {
        let movieList = this.currentState.MovieList
        for (let i = 0; i < movieList.length; i++) {
            if (movieList[i].Title == movie.Title && movieList[i].imdbID != movie.imdbID) return true
        }
        return false
    }

    log() {
        console.log('Current app state', this.currentState);
    }
}