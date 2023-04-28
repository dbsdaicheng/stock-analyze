import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string;
  phone: number;
  address: string;
}
interface statusTextProps {
  [key: string]: string;
}


export const columns: ColumnsType<DataType> = [
  {
    title: '股票代码',
    dataIndex: 'symbol',
    width: '100px'
  },
  {
    title: '股票名称',
    dataIndex: 'name',
    width: '100px'
  },
  {
    title: '地域',
    dataIndex: 'area',
    width: '80px'
  },
  {
    title: '所属行业',
    dataIndex: 'industry',
    width: '100px'
  },
  {
    title: '股票全称',
    dataIndex: 'fullname',
    width: '150px'
  },
  // {
  //   title: '英文全称',
  //   dataIndex: 'enname',
  //   width: '200px'
  // },
  {
    title: '拼音缩写',
    dataIndex: 'cnspell',
  },
  {
    title: '市场类型',
    dataIndex: 'market',
  },
  {
    title: '交易所代码',
    dataIndex: 'exchange',
  },
  {
    title: '交易货币',
    dataIndex: 'currType',
  },
  {
    title: '上市状态',
    dataIndex: 'listStatus',
    render: (text: string) => {
      const status: statusTextProps = {
        "L": "上市",
        "D": "退市",
        "P": "暂停上市"
      }
      return text && status[text];
    }
  },
  {
    title: '上市日期',
    dataIndex: 'listDate',
    render: (text, record) => moment(text).format("YYYY-MM-DD HH:mm:ss")
  },
  // {
  //   title: '退市日期',
  //   dataIndex: 'delistDate',
  //   render: (text, record) => text && moment(text).format("YYYY-MM-DD HH:mm:ss"),
  // },
  {
    title: '是否沪深港通标的',
    dataIndex: 'isHs',
    render: (text: string) => {
      return text == "N" ? "否" : "是";
    }
  },
];