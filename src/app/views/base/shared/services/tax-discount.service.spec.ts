import { TestBed } from '@angular/core/testing';

import { TaxDiscountService } from './tax-discount.service';

describe('TaxDiscountService', () => {
  let service: TaxDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
