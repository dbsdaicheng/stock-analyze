import { Button, Col, Form, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { columns } from './config';
import { getStockList } from '@/api/stockSelect';
import './index.less';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function App() {
  const [form] = Form.useForm();
  const [data] = useState<any[]>([])

  useEffect(() => {
    getStockList(
      {
        "endRow": 0,
        "hasNextPage": true,
        "hasPreviousPage": true,
        "industry": "",
        "isFirstPage": true,
        "isLastPage": true,
        "list": [
          {
            "area": "",
            "cnspell": "",
            "currType": "",
            "delistDate": "",
            "enname": "",
            "exchange": "",
            "fullname": "",
            "industry": "",
            "isHs": "",
            "listDate": "",
            "listStatus": "",
            "market": "",
            "name": "",
            "symbol": "",
            "tsCode": ""
          }
        ],
        "market": "",
        "name": "",
        "navigateFirstPage": 0,
        "navigateLastPage": 0,
        "navigatePages": 0,
        "navigatepageNums": [],
        "nextPage": 0,
        "pageNum": 0,
        "pageSize": 0,
        "pages": 0,
        "prePage": 0,
        "size": 0,
        "startRow": 0,
        "symbol": "",
        "total": 0
      }
    )
  }, []);

  return (
    <div>
      <div className="search">
        <Form
          {...formItemLayout}
          form={form}
        >
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <Form.Item name="gender" label="股票名称">
                <Select
                  placeholder="股票名称关键字模糊搜索"
                  allowClear
                >
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item name="gender" label="股票代码">
                <Select
                  placeholder="股票代码关键字模糊搜索"
                  allowClear
                >
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item name="gender" label="行业">
                <Select
                  placeholder="股票行业选择"
                  allowClear
                >
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item name="gender" label="市场类型">
                <Select
                  placeholder="选择市场类型"
                  allowClear
                >
                  <Select.Option value="male">主板</Select.Option>
                  <Select.Option value="female">科创版</Select.Option>
                  <Select.Option value="other">创业版</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6} offset={18}>
             <div className="button">
              <Button type="primary">查询</Button>
              <Button>重置</Button>
             </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="table">
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </div>
    
  );
}

export default App;
