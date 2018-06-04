import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Button, Icon, Form, Input, Checkbox} from 'antd';
import styles from './index.less';
import commonStyles from '../../index.css';

const FormItem = Form.Item;

const Login = ({
     loading,
     dispatch,
     form: {
       getFieldDecorator,
       validateFieldsAndScroll,
     },
   }) => {
    function handleSubmit(){
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        values.type = 'system';
        dispatch({ type: 'login/login', payload: values })
      })
    }

    return (
      <div className={commonStyles.verticalCenter}>
        <Form onSubmit={handleSubmit} className={styles.loginForm}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              登录
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
