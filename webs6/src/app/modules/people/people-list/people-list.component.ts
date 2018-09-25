import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../services/people.service';
import { TournamentPersonService } from '../../../services/tournament-person.service';
import { Observable } from 'rxjs';
import { Person } from '../../../classes/person';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent implements OnInit {
	people: Observable<any[]>;

	constructor(private ps: PeopleService,
		private ds: TournamentPersonService) {}

	ngOnInit() {
		this.people = this.ps.getAll();
	}

	removeItem(item: Person) : void {
		this.ps.Delete(item);
		this.ds.DeleteByPerson(item);
	}
}
