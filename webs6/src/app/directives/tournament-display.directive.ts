import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-tournament-display-host]'
})

export class TournamentDisplayDirective {
  constructor(public containerRef: ViewContainerRef) { }
}
