export interface DistrictDetailViewModel {
  id: number;
  name: string;
  primarySalesPerson: {
    id: number;
    name: string;
  };
  secondarySalesPersons: {
    id: number;
    name: string;
  }[];
  stores: string[];
}
