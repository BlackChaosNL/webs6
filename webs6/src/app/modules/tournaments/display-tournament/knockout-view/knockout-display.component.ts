import { Component, OnInit, Input } from '@angular/core';
import { TournamentDisplayInterface } from "../tournament-display.interface";
import { Tournament } from '../../../../classes/tournament';

@Component({
  selector: 'app-knockout-display',
  templateUrl: './knockout-display.component.html',
  styleUrls: ['./knockout-display.component.css']
})

export class KnockoutDisplayComponent implements OnInit, TournamentDisplayInterface {
  @Input() tournament: Tournament;
  ngOnInit(): void { }
}
