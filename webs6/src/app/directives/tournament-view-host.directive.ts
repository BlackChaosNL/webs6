import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[app-tournament-view-host]'
})
export class TournamentViewHostDirective {
    constructor(public containerRef: ViewContainerRef) {
    }
}
