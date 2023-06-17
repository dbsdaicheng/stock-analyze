import axios, { AxiosInstance } from 'axios';
import { Route } from 'react-router';

const errorHandle = (status: any, data: any) => {
  switch (status) {
    case 401:
      if (window.location.pathname.includes('/login')) {
        // Toast.fail('用户名密码错误');
      } else {
      }
      break;
    case 403:
    case 404:
    default:
      break;

  }
}

//添加通用的返回数据拦截
const addResponseFilter = (instance: AxiosInstance) => {
  instance.interceptors.response.use((res: { status: number; data: any; }) => {
    if (res.status === 200) {
      if (res?.data.code === 500) {
        window.location.href = '/login';
      } else {
        return Promise.resolve(res.data);
      }
     
    }
    if (res.status === 500) {
      window.location.href = '/login'
    }
    return Promise.reject(res)
  }, (err: { response: any; }) => {
    const { response } = err;
    if (response) {
      errorHandle(response.status, response.data);
      return Promise.reject(response);
    } else {
      return console.log('请求失败')
    }
  })
};


const addResultFilter = () => {
  const instance = axios.create({ timeout: 30000 });
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  //添加结果拦截
  addResponseFilter(instance);

  return instance;
};

export default addResultFilter();



