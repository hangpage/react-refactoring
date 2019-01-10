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
                 login,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {
  const {remember, username, password} = login;

  function handleSubmit() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      values.type = 'system';
      dispatch({type: 'login/login', payload: values})
    })
  }

  const onCheckBoxChange = (e) => {
    dispatch({
      type: 'login/onCheckBoxChange',
      payload: {
        remember: e.target.checked
      }
    })
  };

  return (
    <div className={commonStyles.verticalCenter}>
      <Form onSubmit={handleSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [{required: true, message: '请输入手机号!'}],
          })(
            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} onPressEnter={handleSubmit}
                   placeholder="请输入手机号"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: password,
            rules: [{required: true, message: '请输入密码'}],
          })(
            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                   onPressEnter={handleSubmit} placeholder="请输入密码"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            initialValue: remember,
            valuePropName: 'remember',
          })(
            <Checkbox checked={remember} onChange={onCheckBoxChange}>记住密码</Checkbox>
          )}
          <Button type="primary" onClick={handleSubmit} className={styles.loginFormButton}
                  loading={loading.effects.login} htmlType="button">
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  )
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({loading, login}) => ({loading, login}))(Form.create()(Login))
