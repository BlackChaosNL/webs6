import { base } from './base.class';
import { Tournament } from './tournament';
import { Person } from './person';

export class Score implements base {
	tournament: Tournament;
	person: Person;
	versus: Person;
	round: number;
	personPoints: number;
	versusPoints: number;
}
