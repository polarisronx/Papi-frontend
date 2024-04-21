import Footer from '@/components/Footer';
import {
  userQuickRegisterViaMailUsingPost,
  userRegisterUsingPost,
} from '@/services/openAPI-backend/userController';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { sendUserMailUsingGet } from '@/services/openAPI-backend/mailController';
import {
  // AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  // MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, Link, history } from '@umijs/max';
import { Col, Divider, Row, Space, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

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
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Register: React.FC = () => {
  const { styles } = useStyles();
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('再次输入的密码不一致');
    }
    try {
      // 注册
      const res = await userRegisterUsingPost({
        ...values,
        type,
      });
      const id = res.data;
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login?redirect',
          query,
        });
        return;
      } else {
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  // 邮箱注册方法
  const handleEmailRegisterSubmit = async (values: API.UserRegisterViaMailRequest) => {
    try {
      // 注册
      const res = await userQuickRegisterViaMailUsingPost({
        ...values,
      });
      const id = res.data;
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login?redirect',
          query,
        });
        return;
      } else {
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Polaris API"
          subTitle="Papi 致力于打造全太阳系最好的 API 在线开放平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            if (type === 'account') {
              await handleSubmit(values as API.UserLoginRequest);
            } else {
              await handleEmailRegisterSubmit(values as API.UserLoginViaMailRequest);
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码注册',
              },
              {
                key: 'mail',
                label: '邮箱快速注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />

              {/* <ProFormText.Password
                name="authCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入授权码'}
                rules={[
                  {
                    required: true,
                    message: '授权码是必填项！',
                  },
                  {
                    max:5,
                    type:'string',
                    message:'长度不能大于5'
                  }
                ]}
              /> */}
            </>
          )}
          {type === 'mail' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="mailAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入邮箱账号'}
                rules={[
                  {
                    required: true,
                    message: '邮箱账号是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8',
                  },
                ]}
              />

              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                phoneName={'mailAccount'}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (mailAccount) => {
                  const result = await sendUserMailUsingGet({ mailAccount });
                  if (!result) {
                    return;
                  }
                  message.success('获取验证码成功！');
                }}
              />

              {/* <ProFormText.Password
                name="authCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入授权码'}
                rules={[
                  {
                    required: true,
                    message: '授权码是必填项！',
                  },
                  {
                    max:5,
                    type:'string',
                    message:'长度不能大于5'
                  }
                ]}
              /> */}
            </>
          )}

          <ProFormCheckbox
            initialValue={true}
            style={{
              marginBottom: 8,
              marginTop: 8,
              alignContent: 'center',
            }}
            name="agreeToAnAgreement"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('同意协议后才可以注册'));
                  }
                  return Promise.resolve();
                },
                required: true,
              }),
            ]}
          >
            同意并接受《<Link to={'/agreement/privacy'}>隐私协议</Link>》《
            <Link to={'/agreement/privacy'}>使用协议</Link>》
          </ProFormCheckbox>
          <div
            style={{
              marginBottom: 18,
              marginTop: 8,
              alignContent: 'center',
            }}
          >
            <Row>
              <Col push={1}>
                <Space split={<Divider type="vertical" />}>
                  <Link
                    to={'/user/login'}
                    style={{
                      float: 'right',
                      alignContent: 'center',
                    }}
                  >
                    已有账号?点击前往登录
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
