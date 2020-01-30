import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../../classes/tournament';

@Component({
  selector: 'app-tournament-display',
  templateUrl: './tournament-display.component.html',
  styleUrls: ['./tournament-display.component.css']
})

export class TournamentDisplayComponent implements OnInit {
  @Input() tournament: Tournament;
  ngOnInit(): void { }
}
