import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../../store/store';

@Component({
    selector: 'app-movie-edit-modal',
    templateUrl: './movie-edit-modal.component.html',
    styleUrls: [
        '../modals.style.css',
        './movie-edit-modal.component.css'
    ]
})
export class MovieEditModalComponent implements OnInit {

    public EditedMovie$: Observable<Movie | any>

    constructor(private Store: Store) { }

    ngOnInit() {
        this.EditedMovie$ = this.Store.select(["EditMovie"])
            .distinctUntilChanged()
            .share()
    }

}
