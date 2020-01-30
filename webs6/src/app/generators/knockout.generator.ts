import { GeneratorInterface } from "./generator.interface";
import { Round } from "../classes/Round";
import { Tournament } from "../classes/tournament";
import { CompetitionStatus } from '../classes/CompetitionStatus';
import { KnockoutRoundGenerator } from "./knockout-round.generator";


export class KnockoutGenerator implements GeneratorInterface {
  canGenerate(tournament: Tournament): boolean {
    console.log('KnockoutGenerator');
    return tournament.status == CompetitionStatus.Open
      && tournament.participants.length >= 4
      && tournament.participants.length % 2 == 0;
  }

  generate(tournament: Tournament): Round[] {
    let koRoundGenerator = new KnockoutRoundGenerator(tournament);
    let round = koRoundGenerator.generate(tournament);
    return tournament.rounds === undefined ? [round] : tournament.rounds.concat(round);
  }
}
