import { Directive, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appLazyLoadOnScroll]',
})
export class LazyLoadOnScrollDirective implements OnInit, OnDestroy {

    @Output()
    public DivBottomReached: EventEmitter<any> = new EventEmitter<any>()

    private ScrollEvents: Observable<any> = Observable.fromEvent(this.elRef.nativeElement, "scroll")
    private ScrollSubscription: Subscription;

    constructor(
        private elRef: ElementRef,
    ) { }

    ngOnInit() {
        this.observeScrollActions();
    }

    observeScrollActions() {
        // subscribe to scroll events on div - once scroll bottom reached bubble event up
        this.ScrollSubscription = this.ScrollEvents
            .map(() => this.elRef.nativeElement.scrollTop)
            .filter((scrollTopValue) => {
                return Math.ceil(scrollTopValue) >= this.elRef.nativeElement.scrollHeight - this.elRef.nativeElement.clientHeight
            })
            .debounceTime(50)
            .subscribe(
            (scrollTopValue) => {
                this.elRef.nativeElement.scrollTop = scrollTopValue;
                this.DivBottomReached.emit('div bottom reached');
            },
            (err) => console.log(err)
            )
    }

    ngOnDestroy() {
        this.ScrollSubscription.unsubscribe()
    }
}