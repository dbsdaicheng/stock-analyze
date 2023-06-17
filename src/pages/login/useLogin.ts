import { FormInstance } from 'antd';
import React, { useState } from 'react';
import { getLogin } from '@/api/login';

interface loginProps {
  loginForm: FormInstance,
}
const useLogin = (props: loginProps) => {
  const { loginForm } = props;
  //登陆处理
  const loginSubmit = () => {
    loginForm.validateFields().then((values) => {
      console.log(values)
      try {
        getLogin(values).then((res) => {
          if (res?.code === 0) {

          }
        })
      } catch (e) {
        console.log(e);
      }
    })
  }
  return {
    loginSubmit,
  }
}

export default useLogin;