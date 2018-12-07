import { Tournament } from "../classes/tournament";
import { Participant } from "../classes/Participant";
import { Round } from "../classes/Round";


export interface GeneratorInterface {
  canGenerate(tournament: Tournament): boolean;

  generate(tournament: Tournament): Round[];
}

export class RoundGeneratorBase {
  protected next_date: Date;

  constructor(protected tournament: Tournament) {
    this.init();
  }

  protected init() {
    this.next_date = new Date(this.tournament.start);
  }

  protected getStartTime() {
    this.next_date.setMinutes(this.next_date.getMinutes() + 5);
    return this.next_date.toCustomISOString();
  }

  protected getEndTime() {
    this.next_date.setMinutes(this.next_date.getMinutes() + this.tournament.match_duration);
    return this.next_date.toCustomISOString();
  }

  protected getOthers(participant: Participant, allParticipants: Participant[]) {
    return allParticipants.filter(p => {
      return p.key !== participant.key;
    });
  }
}
