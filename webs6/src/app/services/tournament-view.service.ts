import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Tournament } from "../classes/tournament";
import { CompetitionType } from '../classes/CompetitionType';
import { TournamentViewComponent } from "../modules/tournaments/tournament-views/tournament-view/tournament-view.component";
import { PouleViewComponent } from "../modules/tournaments/tournament-views/poule-view/poule-view.component";
import { TournamentViewHostDirective } from "../directives/tournament-view-host.directive";
import { KnockoutViewComponent } from "../modules/tournaments/tournament-views/knockout-view/knockout-view.component";
import { TournamentViewInterface } from "../modules/tournaments/tournament-views/tournament-view-interface";

@Injectable({
  providedIn: 'root'
})
export class TournamentViewService {
  private views: any = {};

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.views[CompetitionType.Tournament] = TournamentViewComponent;
    this.views[CompetitionType.Knockout] = KnockoutViewComponent;
    this.views[CompetitionType.Poule] = PouleViewComponent;
  }

  createView(host: TournamentViewHostDirective, tournament: Tournament, onCloseMatch: () => void = null) {
    host.containerRef.clear();
    let factory = this.factoryResolver.resolveComponentFactory(this.views[tournament.type]);
    let component = host.containerRef.createComponent(factory);
    let instance = (<TournamentViewInterface>component.instance);

    instance.tournament = tournament;
    instance.onEditTournament.subscribe(next => {
      if (onCloseMatch != null) onCloseMatch();
    });
  }
}
