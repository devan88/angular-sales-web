import { HttpEvent } from '@angular/common/http';
import { UpdateDistrictViewModel } from '../../core/services/models/update-district-view-model.model';

export class GetDistrict {
  static readonly type = '[District] Get';
  constructor(public districtId: number) {}
}

export class UpdateDistrict {
  static readonly type = '[District] Update';
  constructor(public model: UpdateDistrictViewModel) {}
}

export class UpdateDistrictCompleted {
  static readonly type = '[District] Update Completed';
  constructor(public model: HttpEvent<unknown>) {}
}
