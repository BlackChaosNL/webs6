import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TournamentService } from '../../services/tournament.service';
import { PeopleService } from '../../services/people.service';
import { TournamentTypeService } from '../../services/tournament-type.service';
import { TournamentPersonService } from '../../services/tournament-person.service';
import { DataSharingService } from '../../services/shared-data.service';

import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { EditTournamentComponent } from './edit-tournament/edit-tournament.component';
import { ShowTournamentComponent } from './show-tournament/show-tournament.component';

import { AuthGuard } from "../../services/auth-guard.service";

const routes: Routes = [
  {
    path: 'tournament',
    component: ShowTournamentComponent,
    canActivate: [AuthGuard]
  },
  { path: 'tournament/edit', component: EditTournamentComponent },
  { path: 'tournament/create', component: CreateTournamentComponent },
  { path: 'tournament/:id/view', component: ShowTournamentComponent },
];

@NgModule({
  declarations: [
    TournamentListComponent,
    CreateTournamentComponent,
    EditTournamentComponent,
    ShowTournamentComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [TournamentService,
    TournamentTypeService,
    PeopleService,
    TournamentPersonService,
    DataSharingService],
})
export class TournamentRoutingModule { }
