import { HttpParams } from '@angular/common/http';

function convertArrayToQueryString(key: string, array: string[] | number[]) {
  array = array.map(encodeURIComponent);
  return key + '=' + array.join('&' + key + '=');
}

function convertArrayToHttpParams(key: string, array: string[] | number[]) {
  let params = new HttpParams();
  array.forEach((value) => {
    params.append(key, value);
  });
  return params;
}

export const QueryUtility = {
  convertArrayToQueryString,
  convertArrayToHttpParams,
};
