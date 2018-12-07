import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match, Tournament} from "../../../../classes/tournament";
import {TournamentResolverService} from "../../../../services/tournament-resolver.service";
import {TournamentViewInterface} from "../tournament-view-interface";

@Component({
    selector: 'app-tournament-view',
    templateUrl: './tournament-view.component.html',
    styleUrls: ['./tournament-view.component.css']
})
export class TournamentViewComponent implements OnInit, TournamentViewInterface {
    @Input() tournament: Tournament;
    @Output() onEditTournament = new EventEmitter();

    constructor(private resolverService: TournamentResolverService) {
    }

    ngOnInit() {
    }

    canEndTournament() {
        return this.resolverService.canResolve(this.tournament);
    }

    endTournament() {
        this.resolverService.resolve(this.tournament);
        this.onEditTournament.emit();
    }

    closeMatch(match: Match) {
        this.resolverService.closeMatch(match);
        this.onEditTournament.emit();
    }
}
