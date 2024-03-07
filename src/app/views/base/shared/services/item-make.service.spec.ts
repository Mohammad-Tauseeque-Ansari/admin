import { TestBed } from '@angular/core/testing';

import { ItemMakeService } from './item-make.service';

describe('ItemMakeService', () => {
  let service: ItemMakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
