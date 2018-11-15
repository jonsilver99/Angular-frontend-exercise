import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Store } from '../store/store';

@Injectable()
export class MoviesService {

    private ApiKey: string = "f07aaa47";
    private ApiKey2: string = "23fbb5cc";

    constructor(
        private Http: HttpClient,
        private Store: Store
    ) { }

    fetchMovies(page: number): Observable<Movie[] | any[]> {
        page = page || 1;
        // get movies from api and puts them in the store (filter responses with no results)
        return this.Http.get(`${environment.MOVIES_API}/?apikey=${this.ApiKey2}&s=abc&page=${page}`)
            .map((results: any) => results.Search)
            .filter(Boolean)
            .do((movies: Movie[]) => this.Store.appendMovies(movies))
            .catch(err => Observable.throw(err))
    }
}