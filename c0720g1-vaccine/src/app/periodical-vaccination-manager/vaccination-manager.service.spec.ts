import { TestBed } from '@angular/core/testing';

import { VaccinationManagerService } from './vaccination-manager.service';

describe('VaccinationManagerService', () => {
  let service: VaccinationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
