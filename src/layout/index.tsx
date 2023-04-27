import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import './index.less';

const App: React.FC = () => (
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
        onSelect={({item, key}) => window.location.href = key}
        defaultSelectedKeys={['/stock/select']}
        items={[UserOutlined].map(
          (icon, index) => ({
            key: "/stock/select",
            icon: React.createElement(icon),
            label: `股票筛选列表`,
          }),
        )}
      />
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', backgroundColor: "#f7f7f7" }}>
        <div className="content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
);

export default App;