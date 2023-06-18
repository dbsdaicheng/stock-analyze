import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import './index.less';
type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([window.location.pathname]);
  }, [window.location.pathname])

  const items: MenuItem[] = [
    {
      key: "/stock/select",
      icon: React.createElement(UserOutlined),
      label: `股票筛选列表`,
    },{
      key: "/stock/strategy",
      icon: React.createElement(UserOutlined),
      label: `股票策略列表`,
    }
  ]

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className='sider'
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">股票分析决策系统</div>
        <Menu
          theme="dark"
          mode="inline"
          className="menu"
          onSelect={({item, key}) => navigate(key)}
          selectedKeys={selectedKeys}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ padding: '24px 16px 0', backgroundColor: "#f7f7f7" }}>
          <div className="content">
            <Outlet />
          </div>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;