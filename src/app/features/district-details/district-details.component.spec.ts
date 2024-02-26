import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';
import { ApiService } from '../../core/http/api.service';
import { DistrictDetailsComponent } from './district-details.component';
import { DistrictDetailsService } from './district-details.service';

describe('DistrictDetailsComponent', () => {
  jasmine.getEnv().allowRespy(true);
  let component: DistrictDetailsComponent;
  let fixture: ComponentFixture<DistrictDetailsComponent>;
  let districtDetailsServiceSpy = jasmine.createSpyObj(
    'DistrictDetailsService',
    ['getDistrict', 'getSelectedSalesPersonsFromDistrict', 'dispatchDistrict'],
    ['districtState$'],
  ) as jasmine.SpyObj<DistrictDetailsService>;
  let apiServiceSpy = jasmine.createSpyObj('ApiService', [
    'get',
    'put',
  ]) as jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictDetailsComponent, NgxsModule.forRoot([])],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        },
        Store,
      ],
    }).compileComponents();

    //spyOnProperty(districtDetailsServiceSpy, 'districtState$', 'get').and.returnValue(of());
    //spyOn(districtDetailsServiceSpy, 'getSelectedSalesPersonsFromDistrict').and.returnValue(of());
    fixture = TestBed.createComponent(DistrictDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
