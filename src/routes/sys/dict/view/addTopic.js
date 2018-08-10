/**
 * 新增菜单管理
 */

import React, { Component } from "react";
import { Modal, Form, Button, Input, InputNumber } from "antd";
import { connect } from 'dva';

const FormItem = Form.Item;
@connect(({ Dict }) => ({ $data:Dict }))
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	//提交
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.dispatch({type: 'Dict/typeAdd',payload: values});
				this.props.handleCancel();
			}
		});
	};
	render() {
    		const { visible, handleCancel } = this.props;
    		const { getFieldDecorator } = this.props.form;
    		const formItemLayout = {
			labelCol: { sm: { span: 6 }},
			wrapperCol: { sm: { span: 14 }}
		};
		return (
			<Modal
				title={"新增字典类型"}
		        visible={visible}
		        onCancel={handleCancel}
		        maskClosable={false}
		        onOk={this.handleSubmit}
			>
				<Form onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="字典类型名称">
						{getFieldDecorator("name", {
							rules: [{ required: true, message: "请输入字典类型名称" }]
						})(
							<Input />
						)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}
export default Form.create()(Index);
