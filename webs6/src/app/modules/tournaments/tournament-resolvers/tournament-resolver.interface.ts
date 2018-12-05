import {CompetitionStatus, Tournament} from "../../../classes/tournament";

export interface TournamentResolverInterface {
    canResolve(rounds: Tournament): boolean;

    resolve(tournament: Tournament): boolean;// Should return true when the tournament has been closed

    // getWinner(tournament: Tournament): { winner: string | null, score: number };
}

export class BasicTournamentResolver implements TournamentResolverInterface {
    canResolve(tournament: Tournament): boolean {
        let resolve = true;

        tournament.rounds.forEach(r => {
            r.matches.forEach(m => {
                if (!m.decided) resolve = false;
            });
        });

        return resolve;
    }

    resolve(tournament: Tournament): boolean {
        tournament.status = CompetitionStatus.Closed;
        return true;
    }
}