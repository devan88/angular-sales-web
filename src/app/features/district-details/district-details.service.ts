import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, map, switchMap } from 'rxjs';
import { DistrictApiService } from '../../core/services/district-api.service';
import { DistrictQueryResponse } from '../../core/services/models/district-query-response.model';
import { SalesPersonQueryListResponse } from '../../core/services/models/sales-person-query-list-response.model';
import { UpdateDistrictViewModel } from '../../core/services/models/update-district-view-model.model';
import { SalesPersonApiService } from '../../core/services/sales-person-api.service';
import { GetDistrict, UpdateDistrict } from '../store/district.actions';
import { DistrictStateModel } from '../store/district.model';
import { DistrictSelector } from '../store/district.selectors';
import { DistrictDetailViewModel } from './models/district-details-view-model.model';

@Injectable({
  providedIn: 'root',
})
export class DistrictDetailsService {
  public readonly districtState$: Observable<DistrictStateModel>;

  constructor(
    private districtApiService: DistrictApiService,
    private salesPersonApiService: SalesPersonApiService,
    private store: Store,
  ) {
    this.districtState$ = this.store.select(DistrictSelector.district);
  }

  public getAllSalesPersons() {
    return this.salesPersonApiService.getAllSalesPersons();
  }

  public getSelectedSalesPersonsFromDistrict(district$: Observable<DistrictStateModel>) {
    return district$.pipe(
      switchMap(() => {
        return this.getAllSalesPersons();
      }),
    );
  }

  public dispatchDistrict(districtId: number) {
    this.store.dispatch(new GetDistrict(districtId));
  }

  public getDistrict(districtId: number) {
    return this.districtApiService.getDistrict(districtId).pipe(
      switchMap((district) => {
        return this.salesPersonApiService.getAllSalesPersons().pipe(
          map((salesPersons) => {
            return {
              district,
              salesPersons,
            };
          }),
        );
      }),
      map((response) => this.mapDistrictResponseToDistrictDetailViewModel(response)),
    );
  }

  public updateDistrictSalesPersons(
    districtId: number,
    primarySalesPerson: SalesPersonQueryListResponse,
    secondarySalesPersons: SalesPersonQueryListResponse[],
  ) {
    const updateModel = {
      districtId: districtId,
      primarySalesPersonId: primarySalesPerson.id,
      secondarySalesPersonIds: secondarySalesPersons.map((sp) => sp.id),
    } as UpdateDistrictViewModel;
    this.store.dispatch(new UpdateDistrict(updateModel));
  }

  private mapDistrictResponseToDistrictDetailViewModel({
    district,
    salesPersons,
  }: {
    district: DistrictQueryResponse;
    salesPersons: SalesPersonQueryListResponse[];
  }): DistrictDetailViewModel {
    return {
      id: district.id,
      name: district.name,
      primarySalesPerson: salesPersons.find((sp) => sp.id === district.primarySalesPersonId),
      secondarySalesPersons: district.secondarySalesPersonIds
        .filter((id) => salesPersons.find((sp) => sp.id === id))
        .map((id) => salesPersons.find((sp) => sp.id === id)),
      stores: district.stores,
    } as DistrictDetailViewModel;
  }
}
