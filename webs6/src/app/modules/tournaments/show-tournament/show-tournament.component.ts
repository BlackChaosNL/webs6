import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { DataSharingService } from '../../../services/shared-data.service';
import { Tournament } from '../../../classes/tournament';

import { TournamentDisplayService } from "../../../services/tournament-display.service";
import { TournamentDisplayDirective } from '../../../directives/tournament-display.directive';

@Component({
  selector: 'app-show-tournament',
  templateUrl: './show-tournament.component.html',
  styleUrls: ["./show-tournament.component.scss"]
})
export class ShowTournamentComponent implements OnInit, AfterViewInit {
  @ViewChild(TournamentDisplayDirective) tvh: TournamentDisplayDirective;
  private key: string;
  private details: any = new Tournament();

  constructor(private tournamentService: TournamentService,
    private dataSharingService: DataSharingService,
    private tvs: TournamentDisplayService) {
    this.key = " ";
    this.details = new Tournament();
  }

  ngOnInit() {
    this.dataSharingService.getTournament().subscribe(item => {
      this.key = item;

      // Update tournament details
      this.tournamentService
        .getSingleItem(item)
        .subscribe(i => {
          this.details = i;
          this.tvs.createView(this.tvh, this.details);
        });
    });
  }

  ngAfterViewInit() {

  }

  resolve(): void {
    this.tournamentService.Edit(this.key, this.details);
  }
}
