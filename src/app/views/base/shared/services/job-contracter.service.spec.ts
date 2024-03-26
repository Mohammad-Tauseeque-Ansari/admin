import { TestBed } from '@angular/core/testing';

import { JobContracterService } from './job-contracter.service';

describe('JobContracterService', () => {
  let service: JobContracterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobContracterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
