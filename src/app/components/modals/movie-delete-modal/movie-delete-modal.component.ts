import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../../store/store';

@Component({
    selector: 'app-movie-delete-modal',
    templateUrl: './movie-delete-modal.component.html',
    styleUrls: [
        '../modals.style.css',
        '../../movie-form/movie-form.component.css',
        './movie-delete-modal.component.css'
    ]
})
export class MovieDeleteModalComponent implements OnInit {

    public MovieToDelete$: Observable<Movie | any>

    constructor(
        private Store: Store,
    ) { }

    ngOnInit() {
        this.MovieToDelete$ = this.Store.select(["DeleteMovie"])
            .distinctUntilChanged()
            .share()
    }

    deleteMovie(movieToDelete: Movie) {
        this.Store.deleteMovie(movieToDelete)
        setTimeout(this.closeModal.bind(this), 300)
    }

    closeModal() {
        this.Store.set('DeleteMovie', null);
    }
}
