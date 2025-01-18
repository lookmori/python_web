import { PageContainer, ProForm, ProFormCaptcha, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Card, message } from 'antd';

import styles from './index.less';
import { MailTwoTone } from '@ant-design/icons';
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
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
              submitter={{
                // 配置按钮的属性
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
              }}
            >
              <ProFormText
                width="xl"
                name="user_nickname"
                label="昵称"
                rules={[{ required: true, message: '请输入昵称' }]}
              />
              <ProFormText
                width="xl"
                name="user_name"
                label="用户名(登录账号)"
                rules={[{ required: true, message: '请输入用户名' }]}
              />
              <ProFormText.Password
                name="user_pwd"
                width="xl"
                label="密码"
                rules={[{ required: true, message: '请输入密码' }]}
              />
              <ProFormText.Password
                name="user_sure_pwd"
                width="xl"
                label="确认密码"
                dependencies={['user_pwd']}
                rules={[
                  { required: true, message: '请输入确认密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('user_pwd') !== value) {
                        return Promise.reject(new Error('两次密码不一致，请检查！'));
                      }
                    },
                  }),
                ]}
              />
              <ProFormTextArea
                name="user_des"
                label="个人名言"
                width="xl"
                rules={[{ required: true, message: '请输入个人名言' }]}
              />
              <ProFormCaptcha
                width="md"
                label="邮箱(找回密码使用)"
                fieldProps={{
                  size: 'large',
                  prefix: <MailTwoTone />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                // 手机号的 name，onGetCaptcha 会注入这个值
                phoneName="email"
                name="user_email"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                  () => ({
                    validator(_, value) {
                      if (emailPattern.test(value) ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('邮箱格式错误请检查！'),
                      );
                    },
                  }),
                ]}
                placeholder="请输入验证码"
                onGetCaptcha={async (email) => {
                  message.success(`${email}的验证码发送成功!`);
                }}
              />
            </ProForm>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
