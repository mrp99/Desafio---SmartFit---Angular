import { TestBed } from '@angular/core/testing';

import { SearchUnitsService } from './search-units.service';

describe('SearchUnitsService', () => {
  let service: SearchUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
