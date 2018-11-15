import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appImageResolve]',
    host: {
        '(error)': 'onError()'
    }
})
export class ImageResolveDirective {

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
    ) { }

    onError() {
        this.elRef.nativeElement.src = `/assets/default-movie-poster.png`
        this.renderer.addClass(this.elRef.nativeElement, 'default-mode')
    }
}