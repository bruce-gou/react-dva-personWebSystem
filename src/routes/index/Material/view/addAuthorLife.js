/**
 * 新增人物生平
 */

import React, { Component } from "react";
import { Modal, Form, Button, Input, InputNumber, Select, Row, Col } from "antd";
// 引入action

const FormItem = Form.Item;
const Option = Select.Option;
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
	}
	handleSubmit = e => {
		e.preventDefault();
		let $this = this;
		this.props.form.validateFields((err, values) => {
			if (!err) {
			}
		});
	};
	render() {
		const { handleCancel, visible} = this.props;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { lg: { span: 6 }},
			wrapperCol: { lg: { span: 18 }}
		};
		const otherLayout = {
			labelCol: { lg: { span: 3 }},
			wrapperCol: { lg: { span: 21 }}
		};
		return (
			<Modal title={'新增人物生平'} visible={visible} onCancel={handleCancel}
				 maskClosable={false} width={800}>
				<Form onSubmit={this.handleSubmit}>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="年">
								{getFieldDecorator("t1", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input  />
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="朝代">
								{getFieldDecorator("t2", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input  />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="属国">
								{getFieldDecorator("t3", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input  />
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="统治者">
								{getFieldDecorator("t4", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input  />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="年号">
								{getFieldDecorator("t5", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input  />
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="地点">
								{getFieldDecorator("t6", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input  />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<FormItem {...otherLayout} label="事件">
								{getFieldDecorator("t8", {
									rules: [{ required: true, message: "请输入topic" }]
								})(
									<Input.TextArea rows="5"  />
								)}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Modal>
		);
	}
}
export default Form.create()(Index);
