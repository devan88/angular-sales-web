import { Selector } from '@ngxs/store';
import { DistrictStateModel } from './district.model';
import { DistrictState } from './district.state';

export class DistrictSelector {
  @Selector([DistrictState])
  static district(state: DistrictStateModel) {
    return state;
  }
}
