import fetch from '@/utils/request';

//获取股票列表信息数据
export const getStockList = (params?: any) => fetch.post(`/api/queryStockList`, params);
//获取市场类型信息数据
export const getMarketTypes = (params?: any) => fetch.post(`/api/queryMarketList`, params);
//获取行业信息数据
export const getIndustryList = (params?: any) => fetch.post(`/api/queryIndustryList`, params);