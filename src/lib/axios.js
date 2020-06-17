import axios from 'axios';
import _ from 'underscore';
import { message } from 'antd';
import NProgress from "nprogress"

const NETWORK_ERROR_MESSAGE = '网络异常';
const SERVER_ERROR_MESSAGE = '系统异常';
const UNEXPETED_STATUS = -1;
const SUCCESS_STATUS = 0;
const ENTY_STATUS = 6003;
const RESET_STATUS = 6008;

const api = axios.create({
  baseURL: 'http://support-center.openmng',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 15,
  transformRequest: [(data) => {
    NProgress.start();
    if (!data) {
      return '';
    }
    return JSON.stringify(data);
  }],
  transformResponse: [(data) => {
    NProgress.done();
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // 当返回blob时,不应报错
        // message.error('系统异常,请重试!');
      }
    }
    return data;
  }],
});
api.interceptors.response.use(
  (response) => {
    const status = typeof response.data.status !== 'undefined' ? response.data.status : UNEXPETED_STATUS;
    if (status !== SUCCESS_STATUS && status !== ENTY_STATUS && status !== RESET_STATUS) {
      // 导出时status !== 0 要排除
      let dataType = Object.prototype.toString.call(response.data)
      // 1.data === null,2,data为数据流------如果为blob,一定没有status和data属性
      if (response.data.data !== undefined) {   // data为null
        message.error(response.data.msg || SERVER_ERROR_MESSAGE);
        return Promise.reject({
          ...response.data
        })
      }
      if(dataType === '[object Blob]') {      // 不要覆盖,谢谢
        // console.log(dataType)
        return response
      }
      message.error(response.data.msg || SERVER_ERROR_MESSAGE);
      const newData = _.defaults({}, response.data, {
        msg: SERVER_ERROR_MESSAGE,
        status: UNEXPETED_STATUS,
      });
      return Promise.reject(newData);
    }
    return response.data || { status: UNEXPETED_STATUS, msg: 'data为空' };
  },
  () => {
    return Promise.reject({
      msg: NETWORK_ERROR_MESSAGE,
      status: UNEXPETED_STATUS,
    });
  }
);
export default api;
