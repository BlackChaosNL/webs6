import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { TournamentTypeService } from '../../../services/tournament-type.service';
import { TournamentPersonService } from '../../../services/tournament-person.service';
import { PeopleService } from '../../../services/people.service';
import { DataSharingService } from '../../../services/shared-data.service';
import { Observable } from 'rxjs';
import { Tournament } from '../../../classes/tournament';
import { TournamentPerson } from '../../../classes/tournamentPerson';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html'
})
export class EditTournamentComponent implements OnInit {
  constructor(private ds: DataSharingService,
    private ts: TournamentService,
    private t: TournamentTypeService,
    private ps: PeopleService,
    private pt: TournamentPersonService) { }

  private key: string = "";
  private details: any;
  private types: Observable<any>;
  private people: Observable<any>;
  private subscribedPeople: Observable<any>;

  private removePeople: Observable<any>;
  private selectedPeople: string[];

  ngOnInit() {
    this.types = this.t.getAll();
    this.people = this.ps.getAll();
    this.details = new Tournament();
    this.ds.getTournament().subscribe(item => {
      if(item != null) {
        this.key = item;
        this.subscribedPeople = this.pt.getAllByTournament(item);
        this.ts.getSingleItem(item).subscribe(i => {
          this.details = i;
        });
      }
    });
  }

  resolve(): void {
    this.ts.Edit(this.key, this.details);
  	for(var item in this.removePeople) {
  		this.pt.DeleteSpecificPersonFromTournament(this.key, this.removePeople[item]);
  	}

    for (var item in this.selectedPeople) {
      this.pt.Add(new TournamentPerson(this.key, this.selectedPeople[item]));
    }
  }

  remove() : void {
	  this.details = new Tournament();
	  this.ds.setTournament(null);
	  this.ts.Delete(this.key);
  }
}
