import fetch from '@/utils/request';

//获取店铺列表信息
export const getStockList = (params?: any) => fetch.post(`/api/queryStockList`, params);