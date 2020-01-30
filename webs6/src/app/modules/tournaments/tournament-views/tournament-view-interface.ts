import {Tournament} from "../../../classes/tournament";
import {EventEmitter} from "@angular/core";

export interface TournamentViewInterface {
    tournament: Tournament;
    onEditTournament: EventEmitter<any>;
}