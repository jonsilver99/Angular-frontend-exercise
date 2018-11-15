import { Component, OnInit, Input } from '@angular/core';
import { Store } from '../../store/store';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

    @Input() public MovieDetails: Movie;

    constructor(
        private Store: Store
    ) { }

    ngOnInit() { }


    openEditModal() {
        this.Store.set('EditMovie', this.MovieDetails)
    }

    openDeleteModal() {
        this.Store.set('DeleteMovie', this.MovieDetails)
    }

}
