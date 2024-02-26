import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SalesPersonApiService } from './sales-person-api.service';

describe('SalesPersonApiService', () => {
  let service: SalesPersonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SalesPersonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
