import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../../store/store';

@Component({
    selector: 'app-movie-create-modal',
    templateUrl: './movie-create-modal.component.html',
    styleUrls: [
        '../modals.style.css',
        './movie-create-modal.component.css'
    ]
})
export class MovieCreateModalComponent implements OnInit {

    public CreateNewMovie$: Observable<boolean | any>

    constructor(private Store: Store) { }
    
    ngOnInit() {
        this.CreateNewMovie$ = this.Store.select(["CreateNewMovie"])
            .distinctUntilChanged()
            .share()
    }

}