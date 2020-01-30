import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { PeopleService } from '../../../services/people.service';
import { DataSharingService } from '../../../services/shared-data.service';
import { Observable } from 'rxjs';
import { Tournament } from '../../../classes/tournament';
import { CompetitionStatus } from '../../../classes/CompetitionStatus';
import { CompetitionType } from '../../../classes/CompetitionType';
import { GeneratorInterface } from "../../../generators/generator.interface";
import { TournamentViewHostDirective } from "../../../directives/tournament-view-host.directive";
import { TournamentViewService } from "../../../services/tournament-view.service";
import { GeneratorService } from "../../../services/generator.service";

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html'
})
export class EditTournamentComponent implements OnInit {
  @ViewChild(TournamentViewHostDirective) tournamentViewHost: TournamentViewHostDirective;

  constructor(private ds: DataSharingService,
    private ts: TournamentService,
    private ps: PeopleService,
    private generatorService: GeneratorService,
    public tournamentViewService: TournamentViewService) {
  }

  private key: string = "";
  private details: any;
  private people: Observable<any>;
  private participantsToRemove = [];
  private participantsToAdd = [];
  private types = [];
  private generator: GeneratorInterface = null;

  ngOnInit() {
    this.types = Object.keys(CompetitionType);
    this.people = this.ps.getAll();
    this.details = new Tournament();

    this.ds.getTournament().subscribe(item => {
      console.log(this.details);
      if (item != null) {
        this.key = item;
        this.ts.getSingleItem(item).subscribe(i => {
          this.details = i != null ? i : new Tournament();
          this.setGenerator(this.details.type);
          this.tournamentViewService.createView(this.tournamentViewHost, this.details, () => {
            this.save();
          });
        });
      }
    });
  }

  addParticipants() {
    let participants = [];
    this.participantsToAdd.forEach(add => {
      let data = add.split('/');
      if (!this.tournamentHasParticipant(data[0])) {
        participants.push({ key: data[0], name: data[1] });
      }
    });

    this.details.participants = this.details.participants.concat(participants);
    this.participantsToAdd = [];
  }

  removeParticipants() {
    let participants = [];

    this.details.participants.forEach(participant => {
      let remove = this.participantsToRemove.filter(ptr => {
        let data = ptr.split('/');
        return data[0] == participant.key;
      }).length > 0;

      if (!remove) participants.push(participant);
    });

    this.details.participants = participants;
    this.participantsToRemove = [];
  }

  save(): void {
    this.ts.Edit(this.key, this.details);
  }

  remove(): void {
    this.details = new Tournament();
    this.ds.setTournament(null);
    this.ts.Delete(this.key);
  }

  setGenerator(type) {
    this.generator = this.generatorService.getGenerator(type);
  }

  generate() {
    this.details.rounds = this.generator.generate(this.details);
    this.details.status = CompetitionStatus.Started;
    this.ts.Edit(this.key, this.details);
  }

  private tournamentHasParticipant(key: string): boolean {
    return this.details.participants.filter(p => {
      return p.key == key
    }).length > 0;
  }
}
