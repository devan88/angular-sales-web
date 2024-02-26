import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { QueryUtility } from '../utilities/query-utility';
import { SalesPersonQueryAllRequest } from './models/sales-person-query-all-request.model';
import { SalesPersonQueryListResponse } from './models/sales-person-query-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class SalesPersonApiService {
  private readonly salesPersonUrl = 'salesperson';

  constructor(private apiService: ApiService) {}

  public getAllSalesPersons(request: SalesPersonQueryAllRequest = {}) {
    return this.apiService.get<SalesPersonQueryListResponse[]>(this.salesPersonUrl);
  }

  public getSalesPersons(ids: number[] = []) {
    const params = QueryUtility.convertArrayToHttpParams('ids', ids);
    return this.apiService.get<SalesPersonQueryListResponse[]>(this.salesPersonUrl, params);
  }
}
