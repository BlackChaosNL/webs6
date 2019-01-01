import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Tournament } from "../classes/tournament";
import { CompetitionType } from '../classes/CompetitionType';
import { TournamentDisplayDirective } from "../directives/tournament-display.directive";
import { TournamentViewInterface } from "../modules/tournaments/tournament-views/tournament-view-interface";

// Need to be changed to view components displaying decent spectatorview
import { PouleDisplayComponent } from "../modules/tournaments/display-tournament/poule-view/poule-display.component";
import { KnockoutDisplayComponent } from "../modules/tournaments/display-tournament/knockout-view/knockout-display.component";
import { TournamentDisplayComponent } from "../modules/tournaments/display-tournament/tournament-view/tournament-display.component";

@Injectable({
  providedIn: 'root'
})

export class TournamentDisplayService {
  private views: any = {};

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.views[CompetitionType.Tournament] = TournamentDisplayComponent;
    this.views[CompetitionType.Knockout] = KnockoutDisplayComponent;
    this.views[CompetitionType.Poule] = PouleDisplayComponent;
  }

  createView(host: TournamentDisplayDirective, tournament: Tournament, onCloseMatch: () => void = null) {
    host.containerRef.clear();
    let factory = this.factoryResolver.resolveComponentFactory(this.views[tournament.type]);
    let component = host.containerRef.createComponent(factory);
    let instance = (<TournamentViewInterface>component.instance);

    instance.tournament = tournament;
  }
}
