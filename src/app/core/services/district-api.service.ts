import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../http/api.service';
import { DistrictQueryListRequest } from './models/district-query-list-request.model';
import { DistrictQueryListResponse } from './models/district-query-list-response.model';
import { DistrictQueryResponse } from './models/district-query-response.model';
import { UpdateDistrictViewModel } from './models/update-district-view-model.model';

@Injectable({
  providedIn: 'root',
})
export class DistrictApiService {
  private readonly districtUrl = 'district';

  constructor(private apiService: ApiService) {}

  public getDistricts(request: DistrictQueryListRequest) {
    return this.apiService.get<DistrictQueryListResponse[]>(this.districtUrl, undefined, undefined);
  }

  public getDistrict(id: number) {
    return this.apiService.get<DistrictQueryResponse>(
      `${this.districtUrl}/${id}`,
      undefined,
      undefined,
    );
  }

  public updateDistrict(model: UpdateDistrictViewModel) {
    return this.apiService
      .put(`${this.districtUrl}/${model.districtId}`, model, undefined, undefined)
      .pipe(
        tap((response) => {
          console.log('updateDistrict ', response);
        }),
      );
  }
}
