import {base} from './base.class';

export class Tournament implements base {
    name: string = "";
    type: CompetitionType = CompetitionType.Tournament;
    status: CompetitionStatus = CompetitionStatus.Open;
    start: string;
    end: string;
    nr_of_rounds: number = 1;
    matches_per_round: number = 1;
    match_duration: number = 10;
    rounds: Round[] = [];
    participants: Participant[] = [];
    nr_of_poules: number = 1;
    knockout_rounds: number = 0;
    poules: Poule[];
}

export enum CompetitionStatus {
    Open = 'Open',
    Started = 'Started',
    Finished = 'Finished'
}

export enum CompetitionType {
    Tournament = 'Tournament',
    Poule = 'Poule',
    Knockout = 'Knockout'
}

export class Round {
    number: number;
    matches: Match[] = [];
}

export class Match {
    poule_number = 1;
    knockout_round = 0;
    duration: number;
    p1: Participant;
    p2: Participant;
    p1_score: number = 0;
    p2_score: number = 0;
    decided: boolean = false;
    winner: string | null = null;
    start: string;
    end: string;
}

export class Poule {
    number = 0;
    participants: Participant[] = [];
}

export interface Participant {
    key: string;
    name: string;
}
