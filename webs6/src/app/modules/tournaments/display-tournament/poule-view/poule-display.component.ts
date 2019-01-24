import {Component, OnInit, Input} from '@angular/core';
import {Tournament} from '../../../../classes/tournament';

@Component({
    selector: 'app-poule-display',
    templateUrl: './poule-display.component.html',
    styleUrls: ['./poule-display.component.css']
})

export class PouleDisplayComponent implements OnInit {
    @Input() tournament: Tournament;

    ngOnInit(): void {
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
