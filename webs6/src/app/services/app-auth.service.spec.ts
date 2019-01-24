import { TestBed } from '@angular/core/testing';

import { AppAuthService } from './app-auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppAuthService = TestBed.get(AppAuthService);
    expect(service).toBeTruthy();
  });
});
