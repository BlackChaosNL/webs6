import { base } from './base.class';
import { CompetitionStatus } from './CompetitionStatus';
import { CompetitionType } from './CompetitionType';
import { Participant } from './Participant';
import { Match } from './Match';
import { Poule } from './Poule';
import { Round } from './Round';

export class Tournament implements base {
  name: string = "";
  type: CompetitionType = CompetitionType.Tournament;
  status: CompetitionStatus = CompetitionStatus.Open;
  start: string;
  end: string;
  nr_of_rounds: number = 1;
  matches_per_round: number = 1;
  match_duration: number = 10;
  rounds: Round[] = [];
  participants: Participant[] = [];
  nr_of_poules: number = 1;
  knockout_rounds: number = 0;
  poules: Poule[];
}
