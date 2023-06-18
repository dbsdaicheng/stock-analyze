import fetch from '@/utils/request';

// 获取策略列表
export const getStrategyList = (params?: any) => fetch.post(`/api/queryStrategyList`, params);

// 获取策略算法列表
export const getQueryAlgorithmList = (params?: any) => fetch.post(`/api/queryAlgorithmList`, params);
