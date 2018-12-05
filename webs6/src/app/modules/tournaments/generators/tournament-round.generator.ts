import {RoundGeneratorBase} from "./generator.interface";
import {Match, Participant, Round} from "../../../classes/tournament";

export class TournamentRoundGenerator extends RoundGeneratorBase {
    generate(round_nr: number): Round {
        let round = new Round();
        round.number = round_nr;

        for (let mpr = 0; mpr < this.tournament.matches_per_round; mpr++) {
            this.tournament.participants.forEach(participant => {
                const others = this.getOthers(participant, this.tournament.participants);
                this.generateMatchForParticipant(round, participant, others,
                    this.tournament.matches_per_round);
            });
        }

        return round;
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

    private generateMatchForParticipant(round: Round, participant: Participant, others: Participant[], mpr: number) {
        others.forEach(other => {
            if (!this.participantFullyMatched(round, other, mpr) &&
                !this.participantFullyMatched(round, participant, mpr)) {
                round.matches.push(this.generateMatch(participant, other));
            }
        });
    }

    private participantFullyMatched(round: Round, participant: Participant, mpr: number) {
        return round.matches.filter(match => {
            return match.p1.key == participant.key || match.p2.key == participant.key;
        }).length == mpr;
    }
}