import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DistrictApiService } from './district-api.service';

describe('DistrictApiService', () => {
  let service: DistrictApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DistrictApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
