import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '../../store/store';

@Component({
    selector: 'app-movies-gallery',
    templateUrl: './movies-gallery.component.html',
    styleUrls: ['./movies-gallery.component.no-breakpoints.css']
    // styleUrls: ['./movies-gallery.component.breakpoints.css']
})
export class MoviesGalleryComponent implements OnInit, AfterViewInit {

    public MoviesList$: Observable<Movie[] | any>;
    public NextPage = 0;
    public ShowLoadingIndicator: boolean = true;

    @ViewChild('scrollHelper')
    private scrollHelper: ElementRef

    constructor(
        private MoviesService: MoviesService,
        private Store: Store
    ) { }

    ngOnInit() {
        this.MoviesList$ = this.Store.select(['MovieList'])
            .distinctUntilChanged()
            .share()
    }

    ngAfterViewInit() {
        this.fetchMovies();
    }

    fetchMovies() {
        this.NextPage++ // increment page request

        this.ShowLoadingIndicator = true // reveal loading indicator

        // call service to fetch movies & update store
        this.MoviesService.fetchMovies(this.NextPage)
            .subscribe(
            (res) => {
                setTimeout(() => {
                    // if gallery is not filled beyond screen height - fetch more movies until it is
                    if (!this.isGalleryScrollable()) {
                        this.fetchMovies()
                    }
                }, 2000)
            },
            err => console.log(err),
            () => this.ShowLoadingIndicator = false
            )

        this.timeoutLoadingIndicator(); // timeout the loading indicator
    }

    timeoutLoadingIndicator() {
        setTimeout(() => {
            if (this.ShowLoadingIndicator)
                this.ShowLoadingIndicator = false
        }, 4000);
    }

    isGalleryScrollable() {
        let scrollHelper: HTMLElement = this.scrollHelper.nativeElement
        let divHeight = parseInt(window.getComputedStyle(scrollHelper).height)

        if (scrollHelper.scrollHeight > divHeight) return true // gallery is scrollable
        else return false // gallery NOT scrollable! - need to append more content to it
    }

    openMovieCreationModal() {
        this.Store.set('CreateNewMovie', true)
    }
}