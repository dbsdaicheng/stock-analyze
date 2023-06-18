import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { columns } from './config';
import { getIndustryList, getMarketTypes, getStockList } from '@/api/stockSelect';
import './index.less';
import { getQueryAlgorithmList, getStrategyList } from '@/api/strategy';

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
  const [currentParmas, setCurrentParams] = useState<currentParamsProps>({});
  const [algorithmList, setAlgorithmList] = useState<optionsProps[]>([]);

  useEffect(() => {
    // 获取行业信息
    getAlgorith();
  }, [])

  const getAlgorith = async () => {
    const res = await getQueryAlgorithmList();
    const algorithmLIstOptions = res?.data.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
        key: item.id,
      }
    })
    setAlgorithmList(algorithmLIstOptions || []);
  }

  useEffect(() => {
    const searchParams = {
      ...currentParmas,
      "pageNum": params.current,
      "pageSize": params.pageSize,
    }
    debugger
    getStrategyList(searchParams).then((res: any) => {
      setData(res?.data?.list || []);
      setTotal(res?.data?.total);
    })
  }, [params, currentParmas]);

  const paginationChagne = (current: any, pageSize: any) => {
    setParams({
      current: current,
      pageSize: pageSize,
    })
  }

  const onSearch = () => {
    form.validateFields().then((values) => {
      setParams({
        current: 1,
        pageSize: 10,
      })
      setCurrentParams(values);
    })
  }

  const onReset = () => {
    form.resetFields();
    // 重新调用列表的接口
    setCurrentParams({});
    setParams({
      current: 1,
      pageSize: 10,
    })
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
              <Form.Item name="algorithmId" label="策略算法">
                <Select
                  showSearch
                  placeholder="请选择策略算法"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.value ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
                  }
                  options={algorithmList}
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
