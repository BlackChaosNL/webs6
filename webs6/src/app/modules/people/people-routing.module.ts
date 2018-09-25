import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleService }		from '../../services/people.service';
import { PeopleListComponent } 	from './people-list/people-list.component';
import { CommonModule } 		from '@angular/common';
import { AddPersonComponent }	from './people-list/add-person.component';
import { TournamentPersonService }		from '../../services/tournament-person.service';
import { AuthGuard } from "../../services/auth-guard.service";

const peopleRoutes: Routes = [
	{
		path: 'people',
		component: PeopleListComponent,
		canActivate: [ AuthGuard ]
	}
];

@NgModule({
	declarations: [
		AddPersonComponent,
		PeopleListComponent,
	],
	imports: [
		RouterModule.forChild(peopleRoutes),
		CommonModule
	],
	exports: [
		RouterModule
	],
	providers: [PeopleService,
		TournamentPersonService],
})
export class PeopleRoutingModule {}
