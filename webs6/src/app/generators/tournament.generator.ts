import { GeneratorInterface } from "./generator.interface";
import { Tournament } from "../classes/tournament";
import { TournamentRoundGenerator } from "./tournament-round.generator";
import { CompetitionStatus } from '../classes/CompetitionStatus';
import { Round } from '../classes/Round';


export class TournamentGenerator implements GeneratorInterface {
  canGenerate(tournament: Tournament): boolean {
    console.log('TournamentGenerator');
    //A tournament needs to be open
    return tournament.status == CompetitionStatus.Open
      //A tournament needs at least two participants
      && tournament.participants.length >= 2
      //A tournament needs to have an even number of participants
      && tournament.participants.length % 2 == 0;
  }

  generate(tournament: Tournament): Round[] {
    const roundGenerator = new TournamentRoundGenerator(tournament);
    let rounds: Round[] = [];

    for (let i = 0; i < tournament.nr_of_rounds; i++)
      rounds.push(roundGenerator.generate(i + 1));

    return rounds;
  }
}
