import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../../../classes/tournament';

@Component({
  selector: 'app-poule-display',
  templateUrl: './poule-display.component.html',
  styleUrls: ['./poule-display.component.css']
})

export class PouleDisplayComponent implements OnInit {
  @Input() tournament: Tournament;
  ngOnInit(): void { }
}
