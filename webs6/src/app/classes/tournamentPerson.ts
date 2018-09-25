import { base } from './base.class';
import { Tournament } from './tournament';
import { Person } from './person';

export class TournamentPerson implements base {
	tournament: string;
	person: string;
	tournament_person: string;

	public constructor(tournament: string, person: string) {
		this.tournament = tournament;
		this.person = person;
		this.tournament_person = tournament + "_" + person;
	}
}
