import { FormInstance, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getLogin } from '@/api/login';
import { setCookie, getCookie } from '@/utils/utils';
import { useNavigate } from "react-router-dom";

interface loginProps {
  loginForm: FormInstance,
}
const useLogin = (props: loginProps) => {
  const { loginForm } = props;
  const navigate = useNavigate();
  //登陆处理
  const loginSubmit = () => {
    loginForm.validateFields().then((values) => {
      try {
        getLogin(values).then((res: any) => {
          if (res?.code === 0) {
            setCookie("stockToken", res?.msg);
            navigate('/stock/select');
          } else {
            message.error("登陆失败，请重新尝试！");
            loginForm.resetFields();
          }
        })
      } catch (e) {
        console.log(e);
        loginForm.resetFields();
      }
    })
  }
  return {
    loginSubmit,
  }
}

export default useLogin;