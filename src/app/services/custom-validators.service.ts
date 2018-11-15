import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store } from '../store/store';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomValidatorsService {

    constructor(
        private Store: Store,
        private http: HttpClient
    ) { }

    checkIfMovieTitleExists(formGroup: FormGroup): any {
        let movieData = formGroup.value
        let titleExists = this.Store.checkIfMovieTitleExists(formGroup.value)
        if (titleExists)
            formGroup.get('Title').setErrors({ 'titleAlreadyExists': true })
        else
            return null
    }
}
