import {TestBed} from '@angular/core/testing';

import {TournamentViewService} from '../services/tournament-view.service';

describe('TournamentViewService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});

    });

    it('should be created', () => {
        const service: TournamentViewService = TestBed.get(TournamentViewService);
        expect(service).toBeTruthy();
    });

    it('should expect TournamentViewService.get', () => {
        const service: TournamentViewService = TestBed.get(TournamentViewService);
    });
});
