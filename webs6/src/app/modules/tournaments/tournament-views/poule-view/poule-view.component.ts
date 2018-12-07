import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match, Tournament} from "../../../../classes/tournament";
import {TournamentResolverService} from "../../../../services/tournament-resolver.service";
import {TournamentViewInterface} from "../tournament-view-interface";

@Component({
    selector: 'app-poule-view',
    templateUrl: './poule-view.component.html',
    styleUrls: ['./poule-view.component.css']
})
export class PouleViewComponent implements OnInit, TournamentViewInterface {
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

    getMatchesForRoundAndPoule(round_nr: number, number: Number) {
        let matches = [];

        this.tournament.rounds.forEach(round => {
            if (round.number == round_nr) {
                round.matches.forEach(match => {
                    if (match.poule_number == number) matches.push(match);
                });
            }
        });

        return matches;
    }
}
