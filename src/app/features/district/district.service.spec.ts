import { TestBed } from '@angular/core/testing';

import { DistrictApiService } from '../../core/services/district-api.service';
import { DistrictService } from './district.service';

describe('DistrictService', () => {
  let service: DistrictService;
  let districtApiServiceSpy = jasmine.createSpyObj('DistrictApiService', ['getDistricts']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DistrictApiService,
          useValue: districtApiServiceSpy,
        },
      ],
    });
    service = TestBed.inject(DistrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
