import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs';
import { DistrictApiService } from '../../core/services/district-api.service';
import { DistrictDetailsService } from '../district-details/district-details.service';
import { GetDistrict, UpdateDistrict } from './district.actions';
import { DistrictStateModel } from './district.model';

const initialState: DistrictStateModel = {
  id: 0,
  name: '',
  primarySalesPerson: { id: 0, name: '' },
  secondarySalesPersons: [],
  stores: [],
};

const DISTRICT_STATE_TOKEN = new StateToken<DistrictStateModel>('district');
@State<DistrictStateModel>({
  name: DISTRICT_STATE_TOKEN,
  defaults: initialState,
})
@Injectable()
export class DistrictState {
  constructor(
    private districtDetailsService: DistrictDetailsService,
    private districtApiService: DistrictApiService,
  ) {}

  @Selector()
  static district(state: DistrictStateModel) {
    return state;
  }

  @Action(GetDistrict, { cancelUncompleted: true })
  getDistrict(ctx: StateContext<DistrictStateModel>, action: GetDistrict) {
    return this.districtDetailsService.getDistrict(action.districtId).pipe(
      tap((responseModel) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          ...responseModel,
        });
      }),
    );
  }

  @Action(UpdateDistrict, { cancelUncompleted: true })
  updateDistrict(ctx: StateContext<DistrictStateModel>, action: UpdateDistrict) {
    return this.districtApiService.updateDistrict(action.model).pipe(
      tap(() => {
        ctx.dispatch(new GetDistrict(action.model.districtId));
      }),
    );
  }
}
