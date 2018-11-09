import { Person } from '../../../classes/person';
import { Observable } from 'rxjs';
import { Tournament } from '../../../classes/tournament';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { DataSharingService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html'
})
export class TournamentListComponent implements OnInit {
  tournaments: Observable<any[]> = this.ps.getAll();

  constructor(private ps: TournamentService, private ds: DataSharingService) { }

  ngOnInit() {
  }

  resolve(item: string): void {
    this.ds.setTournament(item);
  }
}
