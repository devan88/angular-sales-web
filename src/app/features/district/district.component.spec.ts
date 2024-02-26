import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from '../../core/http/api.service';
import { DistrictComponent } from './district.component';

describe('DistrictComponent', () => {
  let component: DistrictComponent;
  let fixture: ComponentFixture<DistrictComponent>;
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']) as jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictComponent, RouterTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceSpy,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have <p-card> element when getDistricts returns value)', () => {
    apiServiceSpy.get.and.returnValue(
      of([
        {
          id: 1,
          name: 'District1',
        },
      ]),
    );
    fixture = TestBed.createComponent(DistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const districtDe: DebugElement = fixture.debugElement;
    const districtEl: HTMLElement = districtDe.nativeElement;
    const p = districtEl.querySelectorAll('p-card');
    expect(p.length).toBeGreaterThan(0);
  });
});
