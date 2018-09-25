import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentService } from '../../../services/tournament.service';
import { DataSharingService } from '../../../services/shared-data.service';
import { Tournament } from '../../../classes/tournament';
import { TournamentTypeService } from '../../../services/tournament-type.service';
import { PeopleService } from '../../../services/people.service';
import { TournamentPersonService } from '../../../services/tournament-person.service';

@Component({
  selector: 'app-show-tournament',
  templateUrl: './show-tournament.component.html',
  styleUrls: ["./show-tournament.component.scss"]
})
export class ShowTournamentComponent implements OnInit {

  private key: string;
  private details: any = new Tournament();
  private type: any;
  private participants: Observable<any>;

  constructor(
    private tournamentService: TournamentService,
    private dataSharingService: DataSharingService,
    private tournamentTypeService: TournamentTypeService,
    private tournamentPersonService: TournamentPersonService
  ) {
    this.key = "";
    this.details = new Tournament();
  }

	ngOnInit() {
    this.dataSharingService.getTournament().subscribe(item => {
      this.key = item;

      // Update tournament details
      this.tournamentService
        .getSingleItem(item)
        .subscribe(i => {
          this.details = i

          // Update tournament type
          this.type = this.tournamentTypeService
            .getSingleItem(this.details.type)
            .subscribe(t => { this.type = t })
            ;
        });

      // Update participants
      this.participants = this.tournamentPersonService
        .getAllByTournament(item)
        ;
    });
	}

  resolve(): void {
    this.tournamentService.Edit(this.key, this.details);
  }
}
