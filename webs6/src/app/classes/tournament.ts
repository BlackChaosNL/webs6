import { base } from './base.class';
import { TournamentType } from './tournamentType';

export class Tournament implements base {
	name: string = "";
	type: TournamentType;
	playing: boolean;
	rounds: number;
	date: Date;
}
