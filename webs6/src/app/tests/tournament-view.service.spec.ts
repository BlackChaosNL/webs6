import {TestBed} from '@angular/core/testing';

import {TournamentViewService} from '../services/tournament-view.service';

describe('TournamentViewService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});

    });

    it('should create the TournamentViewService', () => {
        const service: TournamentViewService = TestBed.get(TournamentViewService);
        expect(service).toBeTruthy();
    });
});
