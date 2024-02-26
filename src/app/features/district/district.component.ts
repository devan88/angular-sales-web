import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DistrictService } from './district.service';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss',
  host: { class: 'flex flex-wrap justify-center items-center w-full h-full space-x-4' },
})
export class DistrictComponent {
  public district$ = this.districtService.getDistricts();

  constructor(private districtService: DistrictService) {}
}
