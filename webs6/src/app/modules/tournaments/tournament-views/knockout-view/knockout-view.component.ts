import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from "../../../../classes/tournament";
import { Match } from "../../../../classes/Match";
import { TournamentResolverService } from "../../../../services/tournament-resolver.service";
import { GeneratorService } from "../../../../services/generator.service";
import { TournamentViewInterface } from "../tournament-view-interface";

@Component({
  selector: 'app-knockout-view',
  templateUrl: './knockout-view.component.html',
  styleUrls: ['./knockout-view.component.css']
})
export class KnockoutViewComponent implements OnInit, TournamentViewInterface {
  @Input() tournament: Tournament;
  @Output() onEditTournament = new EventEmitter();

  constructor(private resolverService: TournamentResolverService,
    private generatorService: GeneratorService) {
  }

  ngOnInit() { }

  nextRound() {
    this.tournament.rounds = this.generatorService.getGenerator(this.tournament.type).generate(this.tournament);
    this.onEditTournament.emit();
  }

  showEndButton() {
    return this.getNumberOfRounds().length == this.tournament.rounds.length;
  }

  private getNumberOfRounds(): number[] {
    let schema = [];
    let matches = this.tournament.participants.length / 2;

    while (matches => 1) {
      schema.push(matches);
      matches = matches / 2;
      if (matches == 1) {
        schema.push(matches);
        break;
      }
    }

    return schema;
  }

  canGenerateNext() {
    let can = true;

    this.tournament.rounds.forEach(r => {
      r.matches.forEach(m => {
        if (!this.hasWinner(m) || !m.decided) can = false;
      })
    });

    return can;
  }

  // noinspection JSMethodCanBeStatic
  hasWinner(match: Match) {
    return match.p1_score > match.p2_score || match.p1_score < match.p2_score;
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
