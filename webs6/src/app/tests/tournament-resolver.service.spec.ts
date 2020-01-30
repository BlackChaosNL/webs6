import { TestBed } from '@angular/core/testing';

import { TournamentResolverService } from '../services/tournament-resolver.service';

describe('TournamentResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create the TournamentResolverService', () => {
    const service: TournamentResolverService = TestBed.get(TournamentResolverService);
    expect(service).toBeTruthy();
  });
});
