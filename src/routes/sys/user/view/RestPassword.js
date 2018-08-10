/**
 * 重置密码
 */

import React, { Component } from "react";
import { connect } from 'dva';
import { Modal, Form, Button, Input, InputNumber } from "antd";
import { Buffer } from "buffer";
// 引入action

const FormItem = Form.Item;
@connect(({User}) => ({$data: User}))
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//提交
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				values.id = this.props.data.id;
				let buff = new Buffer(values.pwd);
				values.pwd =buff.toString('base64');
				this.props.dispatch({type:'User/editPwd', payload: values });
				this.props.handleCancel();
			}
		});
	};
	//验证密码
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('pwd')) {
			callback('2次输入密码不一致!');
		} else {
			callback();
		}
	}
	render() {
		const { visible, handleCancel } = this.props;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { sm: { span: 6 } },
			wrapperCol: { sm: { span: 14 } }
		};
		return(
			<Modal
        title={"重置密码"}
        visible={visible}
        onCancel={handleCancel}
        maskClosable={false}
        onOk={this.handleSubmit}
      >
		<Form onSubmit={this.handleSubmit}>
			<FormItem {...formItemLayout} label="新密码">
	            {getFieldDecorator("pwd", {
	              rules: [{ required: true, message: "请输入长度为6到20位的数字、字母密码!", pattern: /^[a-zA-Z0-9]{6,20}$/  }]
	            })(<Input type="password"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="确认新密码">
	            {getFieldDecorator("pwd1", {
	              rules: [{ required: true, message: "2次输入密码不一致!" },{ validator: this.checkPassword }]
	            })(<Input type="password"/>)}
			</FormItem>
        </Form>
      </Modal>
		);
	}
}
export default Form.create()(Index);