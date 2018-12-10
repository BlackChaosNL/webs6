import {async, TestBed} from '@angular/core/testing';
import * as test_t from "./test_data/tournament.json";
import * as test_p from "./test_data/poule-tournament.json";
import * as test_k from "./test_data/knockout-tournament.json";

import {GeneratorService} from '../services/generator.service';
import {GeneratorInterface} from "../generators/generator.interface";
import {CompetitionType} from "../classes/CompetitionType";
import {TournamentGenerator} from "../generators/tournament.generator";
import {PouleGenerator} from "../generators/poule.generator";
import {KnockoutGenerator} from "../generators/knockout.generator";
import {Tournament} from "../classes/tournament";
import {CompetitionStatus} from "../classes/CompetitionStatus";
import {Match} from "../classes/Match";


describe('GeneratorService', () => {
    let tournament;
    let poule;
    let knockout;
    let service;

    beforeEach(async(() => {
        TestBed.configureTestingModule({});
        tournament = (<Tournament>(<any>test_t));
        poule = (<Tournament>(<any>test_p));
        knockout = (<Tournament>(<any>test_k));
        service = TestBed.get(GeneratorService);

        Date.prototype.toCustomISOString = function () {
            return this.getFullYear() + '-' +
                (this.getMonth() > 9 ? this.getMonth() : '0' + (this.getMonth() + 1)) + '-' +
                (this.getDate() > 9 ? this.getDate() : '0' + this.getDate()) +
                'T' + (this.getHours() > 9 ? this.getHours() : '0' + this.getHours()) +
                ':' + (this.getUTCMinutes() > 9 ? this.getUTCMinutes() : '0' + this.getUTCMinutes());
        }
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create a TournamentGenerator', () => {
        const generator: GeneratorInterface = service.getGenerator(CompetitionType.Tournament);
        expect(generator instanceof TournamentGenerator).toBe(true);
    });

    it('should create a PouleGenerator', () => {
        const generator: GeneratorInterface = service.getGenerator(CompetitionType.Poule);
        expect(generator instanceof PouleGenerator).toBe(true);
    });

    it('should create a KnockoutGenerator', () => {
        const generator: GeneratorInterface = service.getGenerator(CompetitionType.Knockout);
        expect(generator instanceof KnockoutGenerator).toBe(true);
    });

    it('should be unable to generate a tournament when the status is not Open', () => {
        tournament.status = CompetitionStatus.Started;
        poule.status = CompetitionStatus.Started;
        knockout.status = CompetitionStatus.Started;

        const tournamentGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Tournament);
        const pouleGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Poule);
        const knockoutGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Knockout);

        expect(tournamentGenerator.canGenerate(tournament)).toBe(false);
        expect(pouleGenerator.canGenerate(poule)).toBe(false);
        expect(knockoutGenerator.canGenerate(knockout)).toBe(false);
    });

    it('should be able to generate a tournament when requirements are met', () => {
        const tournamentGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Tournament);
        const pouleGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Poule);
        const knockoutGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Knockout);

        tournament.status = CompetitionStatus.Open;
        poule.status = CompetitionStatus.Open;
        knockout.status = CompetitionStatus.Open;

        expect(tournamentGenerator.canGenerate(tournament)).toBe(true);
        expect(pouleGenerator.canGenerate(poule)).toBe(true);
        expect(knockoutGenerator.canGenerate(knockout)).toBe(true);
    });

    it('should be able to generate a tournament when requirements are met', () => {
        const tournamentGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Tournament);
        const pouleGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Poule);
        const knockoutGenerator: GeneratorInterface = service.getGenerator(CompetitionType.Knockout);

        tournament.status = CompetitionStatus.Open;
        poule.status = CompetitionStatus.Open;
        knockout.status = CompetitionStatus.Open;

        expect(tournamentGenerator.canGenerate(tournament)).toBe(true);
        expect(pouleGenerator.canGenerate(poule)).toBe(true);
        expect(knockoutGenerator.canGenerate(knockout)).toBe(true);
    });

    it('should generate a tournament with 2 matches', () => {
        tournament.status = CompetitionStatus.Open;
        let generator = service.getGenerator(tournament.type);
        let rounds = generator.generate(tournament);
        expect(rounds.length).toBe(1);
        expect(rounds[0].matches.length).toBe(2);
    });

    it('should generate a poule tournament with 2 poules, 2 rounds and 8 matches', () => {
        poule.status = CompetitionStatus.Open;
        let generator = service.getGenerator(poule.type);
        let rounds = generator.generate(poule);
        expect(rounds.length).toBe(2);
        expect(poule.poules.length).toBe(2);
        expect(rounds[0].matches.length).toBe(4);
        expect(rounds[1].matches.length).toBe(4);
    });

    it('should generate a knockout tournament 2 matches in round 1 and 1 match in round 2', () => {
        knockout.status = CompetitionStatus.Open;
        knockout.knockout_rounds = 0;
        let generator = service.getGenerator(knockout.type);
        knockout.rounds = generator.generate(knockout);

        expect(knockout.rounds.length).toBe(1);
        expect(knockout.rounds[0].matches.length).toBe(2);

        let match1: Match = knockout.rounds[0].matches[0];
        let match2: Match = knockout.rounds[0].matches[1];
        match1.winner = match1.p1.name;
        match2.winner = match2.p2.name;
        knockout.rounds = generator.generate(knockout);

        expect(knockout.rounds.length).toBe(2);
        expect(knockout.rounds[1].matches.length).toBe(1);
    });
});
