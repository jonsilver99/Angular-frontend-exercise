import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx'

// services
import { Store } from './store/store';
import { MoviesService } from './services/movies.service';
import { CustomValidatorsService } from './services/custom-validators.service';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviesGalleryComponent } from './components/movies-gallery/movies-gallery.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieCreateModalComponent } from './components/modals/movie-create-modal/movie-create-modal.component';
import { MovieEditModalComponent } from './components/modals/movie-edit-modal/movie-edit-modal.component';
import { MovieDeleteModalComponent } from './components/modals/movie-delete-modal/movie-delete-modal.component';
import { DataLoadingIndicatorComponent } from './components/data-loading-indicator/data-loading-indicator.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { InvalidFormFieldComponent } from './components/invalid-form-field/invalid-form-field.component';
import { ImageResolveDirective } from './directives/image-resolve.directive';
import { LazyLoadOnScrollDirective } from './directives/lazy-load-on-scroll.directive';

// pipes
import { CapitalizeFirstCharPipe } from './pipes/capitalize-first-char.pipe';
import { FilterNonEnglishPipe } from './pipes/filter-non-english.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MovieCardComponent,
        MoviesGalleryComponent,
        MovieEditModalComponent,
        MovieDeleteModalComponent,
        ImageResolveDirective,
        CapitalizeFirstCharPipe,
        DataLoadingIndicatorComponent,
        LazyLoadOnScrollDirective,
        InvalidFormFieldComponent,
        MovieFormComponent,
        MovieCreateModalComponent,
        FilterNonEnglishPipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [Store, MoviesService, CustomValidatorsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
