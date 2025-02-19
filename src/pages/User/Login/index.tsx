import { Footer } from '@/components';
import { loginUser } from '@/services/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import {  Button, Image, message } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import logoSvg from '/public/svg/undraw_designer_0ogx.svg';
import homeSvg from '/public/svg/undraw_tree-swing_5010.svg';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'grid',
      gridTemplateAreas: ` "left right"
                          "left right"
                          "left right"
                          "left right"
                          "footer footer" `,
      gridTemplateRows: '1fr 1fr 1fr  1fr auto' /* 3.各区域 宽高设置 */,
      height: '100vh',
      overflow: 'auto',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const ActionIcons = () => {
  return (
    <>
      <Button type="link" onClick={() => history.push('/user/register')}>
        注册账号
      </Button>
    </>
  );
};



const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();

  const handleSubmit = async (values: any) => {
    try {
      const body = {
        user_name: values.username,
        user_pwd: values.password,
      };
      console.log(body);

      // 登录
      // const msg = await loginUser({ ...body });
      // console.log(msg, 'msg');
      const msg = {
        code: 200,
        data: {},
        message:''
      }
      if (msg.code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        setInitialState((s) => ({
          ...s,
          currentUser: msg.data,
        }));
        
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(msg.message);
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ gridArea: 'left' }}>
        <Image src={homeSvg} preview={false} />
      </div>
      <div
        style={{
          gridArea: 'right',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={logoSvg} />}
          title="来，刷一题吧！"
          subTitle="成为最厉害的刷题大师！"
          initialValues={{
            autoLogin: true,
          }}
          actions={[<ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
