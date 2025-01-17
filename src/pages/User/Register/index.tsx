
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,

} from '@ant-design/pro-components';
import {  Card, message } from 'antd';





import React from 'react'

import styles from './index.less'

export default function RegisterUser() {

  return (
    <PageContainer>
      <div className={styles.container}>
        <div className={styles.white}></div>
        <div className={styles.content}>
          <Card>
            <ProForm
              onFinish={async (values) => {
                console.log(values);
                message.success('提交成功');
              }}
              formKey="base-form-use-demo"
              autoFocusFirstInput
            >
              <ProFormText
                width="lg"
                name="user_name"
                label="用户名"
                rules={[{ required: true, message: 'Please input your username!' }]}
              />
              <ProFormText.Password
                name="user_pwd"
                width="lg"
                label="密码"
                rules={[{ required: true, message: 'Please input your username!' }]}
              />
              <ProFormText.Password
                name="user_sure_pwd"
                width="lg"
                label="确认密码"
                dependencies={['user_pwd']}
                rules={[
                  { required: true, message: 'Please input your username!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('user_pwd') !== value) {
                        return Promise.reject(
                          new Error('两次密码不一致，请检查！'),
                        );
                      }
                    },
                  }),
                ]}
              />
              <ProFormTextArea
                name="user_des"
                label="个人描述"
                width="lg"
                rules={[{ required: true, message: 'Please input your username!' }]}
              />
            </ProForm>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};
