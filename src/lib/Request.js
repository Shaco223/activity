import axios from 'axios';
import { Toast } from 'vant';
import router from "@/router";
import store from '@/store/index'
import {
  apiBasePath,
} from '@/config';

axios.defaults.baseURL = apiBasePath;

axios.interceptors.request.use(
  function (config) {
    //const token = localStorage.getItem(tokenName);
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = token;
    }
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  function (error) {
    console.log('request error:' + error);
    /*return Promise.resolve({
      status: 500,
      error: '请求失败,请检查网络:' + error
    });*/
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    let data = response.data;
    if (!data) {
      Toast('返回数据异常');
    }
    else if (data.status !== 200) {
      if(data.status==401){
        //localStorage.removeItem(tokenName)
        store.commit('SET_TOKEN', '')
        router.replace(
          `/${store.state.tenantId}/wxLogin?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`
        );
      }
      else if(data.status==403){
        //localStorage.removeItem(tokenName)
        router.replace(
          `/${store.state.tenantId}/person/switchStore?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`
        );
      }
      else Toast(data.error)
    }
    return data;
  },
  function (error) {
    console.log('response error:' + error);
    return Promise.resolve({
      status: 500,
      error: '返回数据处理失败:' + error
    });
  }
);

let request = {};
request.install = function (Vue) {
  Vue.prototype.$get = axios.get;
  Vue.prototype.$post = axios.post;
  Vue.prototype.$apiBasePath = apiBasePath;
};
request.get = axios.get;
request.post = axios.post;

export default request;