import {Injectable} from '@angular/core';
import {KnockoutGenerator} from "../modules/tournaments/generators/knockout.generator";
import {CompetitionType} from "../classes/tournament";
import {PouleGenerator} from "../modules/tournaments/generators/poule.generator";
import {TournamentGenerator} from "../modules/tournaments/generators/tournament.generator";

@Injectable({
    providedIn: 'root'
})
export class GeneratorService {
    private generators = {};

    constructor() {
        this.generators[CompetitionType.Tournament] = new TournamentGenerator();
        this.generators[CompetitionType.Poule] = new PouleGenerator();
        this.generators[CompetitionType.Knockout] = new KnockoutGenerator();
    }

    public getGenerator(type: CompetitionType) {
        return this.generators[type];
    }
}
