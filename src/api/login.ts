import fetch from '@/utils/request';

// 登陆
export const getLogin = (params?: any) => fetch.post(`/api/user/login`, params);
