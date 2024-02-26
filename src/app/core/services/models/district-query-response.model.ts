export interface DistrictQueryResponse {
  id: number;
  name: string;
  primarySalesPersonId: number;
  secondarySalesPersonIds: number[];
  stores: string[];
}
