import { Tournament } from "../classes/tournament";
import { RoundGeneratorBase } from "./generator.interface";
import { Participant } from "../classes/Participant";
import { Round } from "../classes/Round";
import { Match } from "../classes/Match";

export class KnockoutRoundGenerator extends RoundGeneratorBase {
  generate(tournament: Tournament): Round {
    let started = tournament.knockout_rounds != 0;

    let round = new Round();
    round.number = started ? tournament.knockout_rounds + 1 : 1;
    round.matches = this.generateMatches(started ?
      this.getWinnersFromRound(round.number - 1, tournament) : tournament.participants
    );

    tournament.knockout_rounds += 1;
    return round;
  }

  private getWinnersFromRound(round: number, tournament: Tournament) {
    let winners = [];

    tournament.rounds.forEach(r => {
      if (r.number == round) {
        r.matches.forEach(m => {
          winners.push(m.winner == m.p1.name ? m.p1 : m.p2);
        });
      }
    });

    return winners;
  }

  private generateMatches(participants: Participant[]) {
    let count = 0;
    let matches = [];

    while (count < participants.length) {
      matches.push(this.generateMatch(participants[count], participants[count + 1]));
      count += 2;
    }

    return matches;
  }

  private generateMatch(p1: Participant, p2: Participant): Match {
    let match = new Match();
    match.p1 = p1;
    match.p2 = p2;
    match.start = this.getStartTime();
    match.end = this.getEndTime();
    match.duration = this.tournament.match_duration;
    return match;
  }
}
