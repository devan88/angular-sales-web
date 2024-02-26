import { Routes } from '@angular/router';
import { DistrictDetailsComponent } from './features/district-details/district-details.component';
import { DistrictComponent } from './features/district/district.component';

export const routes: Routes = [
  {
    path: '',
    component: DistrictComponent,
  },
  {
    path: 'district-details/:id',
    component: DistrictDetailsComponent,
  },
];
