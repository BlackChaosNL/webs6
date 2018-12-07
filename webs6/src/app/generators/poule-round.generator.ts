import { Match, Participant, Poule, Round } from "../classes/tournament";
import { RoundGeneratorBase } from "./generator.interface";

export class PouleRoundGenerator extends RoundGeneratorBase {
  generate(round_nr: number): Round {
    let round = new Round();
    round.number = round_nr;

    for (let mpr = 0; mpr < this.tournament.matches_per_round; mpr++) {
      this.tournament.poules.forEach(poule => {
        poule.participants.forEach(participant => {
          const others = this.getOthers(participant, poule.participants);
          this.generateMatchesForParticipant(poule.number, round, participant, others,
            this.tournament.matches_per_round);
        });
      });
    }

    return round;
  }

  generatePoules() {
    let nr_of_participants = this.tournament.participants.length;
    let players_per_pool = nr_of_participants / this.tournament.nr_of_poules;
    let poules: Poule[] = [];
    let poule_nr = 0;
    let total_count = 0;

    while (total_count < nr_of_participants) {
      let poule = new Poule();
      poule.number = ++poule_nr;

      let poule_count = 0;
      while (poule_count < players_per_pool) {
        poule.participants.push(this.tournament.participants[total_count]);
        poule_count++;
        total_count++;
      }

      poules.push(poule);
    }

    return poules;
  }

  private generateMatchesForParticipant(pool_nr: number, round: Round, participant: Participant, others: Participant[], mpr: number) {
    others.forEach(other => {
      while (!this.allMatchesGenerated(round, pool_nr, mpr, participant, other)) {
        round.matches.push(this.generateMatch(pool_nr, participant, other));
      }
    });
  }

  private allMatchesGenerated(round: Round, poule_nr: number, mpr: number, _p1: Participant, _p2: Participant) {
    return round.matches.filter(match => {
      return match.poule_number == poule_nr
        && (
          match.p1.key == _p1.key && match.p2.key == _p2.key
          || match.p1.key == _p2.key && match.p2.key == _p1.key
        );
    }).length == mpr;
  }

  private generateMatch(pool_nr: number, p1: Participant, p2: Participant): Match {
    let match = new Match();
    match.poule_number = pool_nr;
    match.p1 = p1;
    match.p2 = p2;
    match.start = this.getStartTime();
    match.end = this.getEndTime();
    match.duration = this.tournament.match_duration;
    return match;
  }
}
