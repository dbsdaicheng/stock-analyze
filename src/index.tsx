import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import { BrowserRouter, HistoryRouterProps, RouterProvider } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import './index.css';
import 'antd/dist/antd.css';
dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>,
  </React.StrictMode>
);
