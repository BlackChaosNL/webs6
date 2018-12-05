import { Observable } from 'rxjs';
import {CompetitionType, Tournament} from '../../../classes/tournament';
import { PeopleService } from '../../../services/people.service';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './create-tournament.component.html'
})
export class CreateTournamentComponent implements OnInit {
  tournaments: Observable<any[]>;
  types: any[];
  people: Observable<any[]>;

  newTournament: Tournament = new Tournament();
  selectedPeople: string[] = [];

  constructor(private tournamentService: TournamentService,
    private users: PeopleService) { }

  ngOnInit() {
    this.tournaments = this.tournamentService.getAll();
    this.types = Object.keys(CompetitionType);
    this.people = this.users.getAll();
  }

  resolve() {
    this.selectedPeople.forEach(p => {
      let data = p.split('/');
        this.newTournament.participants.push({key: data[0], name: data[1]});
    });

    this.tournamentService.Add(this.newTournament);
    this.newTournament = new Tournament();
    this.selectedPeople = [];
  }
}
