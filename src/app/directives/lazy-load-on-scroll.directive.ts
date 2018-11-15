import { Directive, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appLazyLoadOnScroll]',
})
export class LazyLoadOnScrollDirective implements OnInit, OnDestroy {

    @Output()
    public DivBottomReached: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>()

    private ScrollEvents: Observable<any> = Observable.fromEvent(this.elRef.nativeElement, "scroll")
    private ScrollSubscription: Subscription;

    constructor(
        private elRef: ElementRef,
    ) { }

    ngOnInit() {
        this.observeScrollActions();
    }

    observeScrollActions() {
        this.ScrollSubscription = this.ScrollEvents
            .map((event) => {
                // console.log(`Content Scroll height: ${this.elRef.nativeElement.scrollHeight}`)
                // console.log(`Div height: ${this.elRef.nativeElement.clientHeight}`)
                // console.log(`Scroll position from top : ${this.elRef.nativeElement.scrollTop}`)
                return this.elRef.nativeElement.scrollTop;
            })
            .filter((scrollTopValue) => {
                return Math.ceil(scrollTopValue) >= this.elRef.nativeElement.scrollHeight - this.elRef.nativeElement.clientHeight
            })
            .debounceTime(50)
            .subscribe(
            (scrollTopValue) => {
                this.elRef.nativeElement.scrollTop = scrollTopValue;
                this.DivBottomReached.emit(this.elRef.nativeElement);
            },
            (err) => console.log(err)
            )
    }

    ngOnDestroy() {
        this.ScrollSubscription.unsubscribe()
    }
}