import { TestBed } from '@angular/core/testing';

import { MrnService } from './mrn.service';

describe('MrnService', () => {
  let service: MrnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
