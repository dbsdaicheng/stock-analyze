import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string;
  phone: number;
  address: string;
}


export const columns: ColumnsType<DataType> = [
  {
    title: '股票代码',
    dataIndex: 'key',
  },
  {
    title: '股票名称',
    dataIndex: 'name',
  },
  {
    title: '地域',
    dataIndex: 'age',
  },
  {
    title: '所属行业',
    colSpan: 2,
    dataIndex: 'tel',
  },
  {
    title: '股票全程',
    colSpan: 0,
    dataIndex: 'phone',
  },
  {
    title: '英文全称',
    dataIndex: 'address',
  },
  {
    title: '拼音缩写',
    dataIndex: 'address',
  },
  {
    title: '市场类型',
    dataIndex: 'address',
  },
  {
    title: '交易所代码',
    dataIndex: 'address',
  },
  {
    title: '交易货币',
    dataIndex: 'address',
  },
  {
    title: '上市状态',
    dataIndex: 'address',
  },
  {
    title: '上市日期',
    dataIndex: 'address',
  },
  {
    title: '退市日期',
    dataIndex: 'address',
  },
  {
    title: '是否沪深港通标的',
    dataIndex: 'address',
  },
];