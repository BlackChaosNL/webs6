import { Participant } from './Participant'

export class Match {
  poule_number = 1;
  knockout_round = 0;
  duration: number;
  p1: Participant;
  p2: Participant;
  p1_score: number = 0;
  p2_score: number = 0;
  decided: boolean = false;
  winner: string | null = null;
  start: string;
  end: string;
}
