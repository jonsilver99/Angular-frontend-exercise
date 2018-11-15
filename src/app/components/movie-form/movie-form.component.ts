import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidatorsService } from '../../services/custom-validators.service';
import { Store } from '../../store/store';

@Component({
    selector: 'app-movie-form',
    templateUrl: './movie-form.component.html',
    styleUrls: [
        '../modals/modals.style.css',
        './movie-form.component.css'
    ]
})

export class MovieFormComponent implements OnInit {

    @Input()
    public EditedMovie: Movie;
    public MovieForm: FormGroup;

    constructor(
        private CustomValidators: CustomValidatorsService,
        private Store: Store,
        private FB: FormBuilder,
    ) { }

    ngOnInit() {
        if (this.EditedMovie) this.initMovieForm(this.EditedMovie)
        else this.initMovieForm()
    }

    initMovieForm(movie?: Movie) {
        let title = movie ? movie.Title : ''
        let year = movie ? movie.Year : ''
        let type = movie ? movie.Type : ''
        let imdbID = movie ? movie.imdbID : ''
        let poster = movie ? movie.Poster : ''

        this.MovieForm = this.FB.group(
            {
                Title: [title, [Validators.required]],
                Year: [year, [Validators.required, Validators.pattern(/^[\d\u2013|\u2014–—-]+$/)]], //allow digits, dash and em/en dash 
                Type: [type, [Validators.required]],
                // fixed - unchangeable movie props
                imdbID: [imdbID, [Validators.required]],
                Poster: [poster]
            },
            {
                validator: this.CustomValidators.checkIfMovieTitleExists.bind(this.CustomValidators)
            }
        )
    }

    fieldIsInvalid(fieldName: string): boolean | any {
        return this.MovieForm.get(fieldName).touched && this.MovieForm.get(fieldName).invalid
    }

    onSubmit() {
        if (this.EditedMovie) this.saveChangesToMovie(this.EditedMovie)
        else this.createNewMovie()
    }

    saveChangesToMovie(movieToEdit?: Movie) {
        let editedChanges = this.MovieForm.value
        this.Store.editMovie(movieToEdit, editedChanges)
        setTimeout(this.closeModal.bind(this), 300)
    }

    createNewMovie() {
        let newMovie = this.MovieForm.value
        this.Store.createNewMovie(newMovie);
        setTimeout(this.closeModal.bind(this), 300)
    }

    closeModal() {
        this.Store.set('EditMovie', null);
        this.Store.set('CreateNewMovie', false);
    }
}