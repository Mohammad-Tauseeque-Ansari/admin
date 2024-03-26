import { TestBed } from '@angular/core/testing';

import { ContarcterService } from './contarcter.service';

describe('ContarcterService', () => {
  let service: ContarcterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContarcterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
