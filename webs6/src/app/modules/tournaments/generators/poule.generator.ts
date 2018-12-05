import {GeneratorInterface} from "./generator.interface";
import {CompetitionStatus, Round, Tournament} from "../../../classes/tournament";
import {PouleRoundGenerator} from "./poule-round.generator";


export class PouleGenerator implements GeneratorInterface {
    canGenerate(tournament: Tournament): boolean {
        console.log('PouleGenerator');
        //A poule tournament should be open
        return tournament.status == CompetitionStatus.Open
            //A poule tournament needs at least 2 participants
            && tournament.participants.length >= 2
            //The number of participants must be even
            && tournament.participants.length % 2 == 0
            //Every poule needs at least 2 participants
            && tournament.participants.length % (tournament.nr_of_poules * 2) == 0;
    }

    generate(tournament: Tournament): Round[] {
        const pouleRoundGenerator = new PouleRoundGenerator(tournament);
        tournament.poules = pouleRoundGenerator.generatePoules();

        let rounds = [];
        for (let i = 0; i < tournament.nr_of_rounds; i++) {
            rounds.push(pouleRoundGenerator.generate(i + 1));
        }

        return rounds;
    }
}
