import { Person } from '../../../classes/person';
import { Observable } from 'rxjs';
import { Tournament } from '../../../classes/tournament';
import { PeopleService } from '../../../services/people.service';
import { TournamentType } from '../../../classes/tournamentType';
import { TournamentPerson } from '../../../classes/tournamentPerson';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { TournamentTypeService } from '../../../services/tournament-type.service';
import { TournamentPersonService } from '../../../services/tournament-person.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './create-tournament.component.html'
})
export class CreateTournamentComponent implements OnInit {
  tournaments: Observable<any[]>;
  types: Observable<any[]>;
  people: Observable<any[]>;

  newTournament: Tournament = new Tournament();
  selectedPeople: string[];

  constructor(private ps: TournamentService,
    private type: TournamentTypeService,
    private users: PeopleService,
    private subscribe: TournamentPersonService) { }

  ngOnInit() {
    this.tournaments = this.ps.getAll();
    this.types = this.type.getAll();
    this.people = this.users.getAll();
  }

  resolve() {
    // TODO: Check if invalid values are given
    const value = this.ps.Add(this.newTournament);
    console.log(this.selectedPeople);
    for (var i = 0; i < this.selectedPeople.length; i++) {
      this.subscribe.Add(new TournamentPerson(value, this.selectedPeople[i]));
    }
    this.newTournament = new Tournament();
  }
}
