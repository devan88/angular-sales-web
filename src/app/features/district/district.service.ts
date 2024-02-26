import { Injectable } from '@angular/core';
import { DistrictApiService } from '../../core/services/district-api.service';
import { DistrictQueryListRequest } from '../../core/services/models/district-query-list-request.model';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private districtApiService: DistrictApiService) {}

  public getDistricts(request: DistrictQueryListRequest = {}) {
    return this.districtApiService.getDistricts(request);
  }
}
