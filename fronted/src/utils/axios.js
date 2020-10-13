import axios from 'axios';
import {message} from 'antd';
import localStorage, { localStorageKey } from '@/utils/localStorage';
import { SUCCESS_CODE } from './constant';
import { setToken } from './tools';

const baseURL = '/api/java';
let $axios = axios.create({
  baseURL,
});

function interceptorsResponseError(error) {
  return Promise.reject(error);
}
$axios.interceptors.response.use(res => res, interceptorsResponseError);

export const defaultConfig = {
  requestMethod: param => {
    return $axios(param);
  },
  formatResult(response) {
    return response.data;
  },
  onSuccess() {},
  onError(err) {
    switch (err.status) {
      case 200:
        // doSomething
        if (err.data.code === 1) {
          message.error(err.data.errMsg);
        }
        break;
      default:
        message.error(err.msg);
    }
  },
};
