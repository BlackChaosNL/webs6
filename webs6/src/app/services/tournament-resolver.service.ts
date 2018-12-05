import {Injectable} from '@angular/core';
import {CompetitionType, Match, Tournament} from "../classes/tournament";
import {
    BasicTournamentResolver,
    TournamentResolverInterface
} from "../modules/tournaments/tournament-resolvers/tournament-resolver.interface";

@Injectable({
    providedIn: 'root'
})
export class TournamentResolverService {
    private resolvers: any;

    constructor() {
        this.resolvers = {};
        this.resolvers[CompetitionType.Tournament] = new BasicTournamentResolver();
        this.resolvers[CompetitionType.Poule] = this.resolvers[CompetitionType.Tournament];
        this.resolvers[CompetitionType.Knockout] = this.resolvers[CompetitionType.Tournament];
    }

    private getResolver(type: CompetitionType): TournamentResolverInterface {
        return this.resolvers[type];
    }

    canResolve(tournament: Tournament): boolean {
        return this.getResolver(tournament.type).canResolve(tournament);
    }

    resolve(tournament: Tournament): boolean {
        return this.getResolver(tournament.type).resolve(tournament);
    }

    // noinspection JSMethodCanBeStatic
    closeMatch(match: Match) {
        if (match.p1_score > match.p2_score)
            match.winner = match.p1.name;
        else if (match.p1_score < match.p2_score)
            match.winner = match.p2.name;

        match.decided = true;
    }
}
