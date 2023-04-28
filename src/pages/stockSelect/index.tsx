import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { columns } from './config';
import { getIndustryList, getMarketTypes, getStockList } from '@/api/stockSelect';
import './index.less';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface paramsProps {
  current: number;
  pageSize: number;
}

interface currentParamsProps {
  name?: string;
  market?: string;
  industry?: string;
  symbol?: string;
}

interface optionsProps {
  key?: string;
  value?: string;
}

function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [params, setParams] = useState<paramsProps>({current: 1, pageSize: 10})
  const [marketTypeOptions, setMarketTypeOptions] = useState<optionsProps[]>([]);
  const [currentParmas, setCurrentParams] = useState<currentParamsProps>({});
  const [industryOptions, setindustryOptions] = useState<optionsProps[]>([]);

  useEffect(() => {
    // 获取市场类型信息
    getMarketType();
    // 获取行业信息
    getIndustry();
  }, [])

  useEffect(() => {
    const searchParams = {
      ...currentParmas,
      "pageNum": params.current,
      "pageSize": params.pageSize,
    }
    getStockList(searchParams).then((res: any) => {
      setData(res?.data?.list || []);
      setTotal(res?.data?.total);
    })
  }, [params, currentParmas]);

  const getMarketType = async () => {
    const res = await getMarketTypes();
    const markettypes = res?.data.map((item: any) => {
      return {
        value: item,
        key: item,
      }
    })
    setMarketTypeOptions(markettypes || []);
  }

  const paginationChagne = (current: any, pageSize: any) => {
    setParams({
      current: current,
      pageSize: pageSize,
    })
  }

  const onSearch = () => {
    form.validateFields().then((values) => {
      setCurrentParams(values);
    })
  }

  const getIndustry = async () => {
    const res = await getIndustryList();
    const industryList = res?.data.map((item: any) => {
      return {
        value: item,
        key: item,
      }
    })
    setindustryOptions(industryList || []);
  }

  const onReset = () => {
    form.resetFields();
    // 重新调用列表的接口
    setCurrentParams({});
  }

  return (
    <div>
      <div className="search">
        <Form
          {...formItemLayout}
          form={form}
        >
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <Form.Item name="name" label="股票名称">
                <Input placeholder="股票名称关键字模糊搜索" allowClear/>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="symbol" label="股票代码">
                <Input placeholder="股票代码关键字模糊搜索" allowClear/>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="industry" label="行业">
                <Select
                  showSearch
                  placeholder="请选择行业"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.value ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
                  }
                  options={industryOptions}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="market" label="市场类型">
                <Select
                  placeholder="请选择市场类型"
                  options={marketTypeOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6} offset={18}>
             <div className="button">
              <Button type="primary" onClick={onSearch}>查询</Button>
              <Button onClick={onReset}>重置</Button>
             </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="table">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="symbol"
          bordered 
          pagination={
           {
            ...params,
            total: total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTitle: true,
            onChange: paginationChagne,
           }
          }
        />
      </div>
    </div>
    
  );
}

export default App;
