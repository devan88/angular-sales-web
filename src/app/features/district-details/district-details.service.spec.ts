import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ApiService } from '../../core/http/api.service';
import { DistrictState } from '../store/district.state';
import { DistrictDetailsService } from './district-details.service';

describe('DistrictDetailsService', () => {
  let service: DistrictDetailsService;
  let apiServiceSpy = jasmine.createSpyObj('DistrictApiService', [
    'get',
    'put',
  ]) as jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DistrictState])],
      providers: [
        HttpClientTestingModule,
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        },
        Store,
      ],
    });
    service = TestBed.inject(DistrictDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
