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
		this.state = {
			data: this.props.data
		};
	}
	componentDidMount() {
	}
	//提交
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { editData } = this.props;
				values.typeId = this.state.data.id;
				if(editData){//编辑
					values.id = editData.id;
					this.props.dispatch({type: 'Dict/edit',payload: values});
				}else{//新增
					this.props.dispatch({type: 'Dict/add',payload: values});
				}
				this.props.handleCancel();
			}
		});
	};
	render() {
    		const { visible, handleCancel, title, data, editData } = this.props;
    		const { getFieldDecorator } = this.props.form;
    		const formItemLayout = {
			labelCol: { sm: { span: 6 }},
			wrapperCol: { sm: { span: 14 }}
		};
		return (
			<Modal
				title={title}
		        visible={visible}
		        onCancel={handleCancel}
		        maskClosable={false}
		        onOk={this.handleSubmit}
			>
				<Form onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="字典类型">
						{getFieldDecorator("typeId", {
							initialValue: data && data.name,
							rules: [{ required: true, message: "请输入字典类型名称" }]
						})(
							<Input readOnly={true}/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="字典名称">
						{getFieldDecorator("name", {
							initialValue: editData && editData.name,
							rules: [{ required: true, message: "请输入字典名称" }]
						})(
							<Input />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="code">
						{getFieldDecorator("code", {
							initialValue: editData && editData.code,
							rules: [{ required: true, message: "请输入字典code" }]
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
