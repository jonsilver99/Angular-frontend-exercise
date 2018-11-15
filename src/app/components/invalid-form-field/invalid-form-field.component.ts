import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-invalid-form-field',
    templateUrl: './invalid-form-field.component.html',
    styleUrls: ['./invalid-form-field.component.css']
})
export class InvalidFormFieldComponent implements OnInit, OnChanges {

    @Input()
    public Errors: Object | any
    public DisplayErrorMsg: string

    constructor() { }

    ngOnInit() {
        this.resolveErrorMsg();
    }

    ngOnChanges(changes: SimpleChange | any) {
        this.resolveErrorMsg();
    }

    resolveErrorMsg() {
        if (this.Errors) {
            if (this.Errors.hasOwnProperty('required')) this.DisplayErrorMsg = 'Required field'
            else if (this.Errors.hasOwnProperty('pattern')) this.DisplayErrorMsg = `Invalid characters`
            else if (this.Errors.hasOwnProperty('titleAlreadyExists')) this.DisplayErrorMsg = `Title already exists`
            else this.DisplayErrorMsg = `Field has erros`
        }
    }
}
