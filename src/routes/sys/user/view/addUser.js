/**
 * 新增用户
 */

import React, { Component } from "react";
import { Modal, Form, Button, Input, Select, Row, Col, Radio } from "antd";
import { connect } from 'dva';
import { Buffer } from "buffer";

import { getDict } from "@/utils/tool";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@connect(({ User }) => ({ $data: User }))
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { data } = this.props;
		if (data) {
	  		let val = {
	      		user:data.user,
	      		name:data.name,
	      		tel:data.tel,
	      		mailbox:data.mailbox,
	      		role:`${data.role}`,
	      		isEnable:data.isEnable
	      	};
	      	this.props.form.setFieldsValue(val);
		}
	}
	//提交
	handleSubmit = e => {
		e.preventDefault();
		let $this = this;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { data } = this.props;
				const dict = getDict('用户角色');
				for(let i in dict){
					if(values.role === dict[i].code){
						values.roleName = dict[i].name;
					}
				}
				if(data){//编辑
					values.id = data.id;
					this.props.dispatch({type:'User/edit', payload: values });
				}else{
					let buff = new Buffer(values.pwd);
					values.pwd =buff.toString('base64');
					this.props.dispatch({type:'User/add', payload: values });
				}
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
		const { visible, handleCancel, title, data } = this.props;
		const { getFieldDecorator } = this.props.form;
		const dict = getDict('用户角色');
		const formItemLayout2 = {
			labelCol: { sm: { span: 6 } },
			wrapperCol:{sm: { span: 14 } }
		};
		return (
			<Modal
				title={title}
		        visible={visible}
		        onCancel={handleCancel}
		        maskClosable={false}
		        onOk={this.handleSubmit}
		        width={900}
			>
 				<Form>
					<Row>
						<Col span={12}>
                				<FormItem label="用户名称" hasFeedback {...formItemLayout2}>
                  				{getFieldDecorator("name", {
                    					rules: [{ required: true, message: "请输入用户名称！" }]
                  				})(<Input placeholder="请输入用户名称" disabled={data?true:false}/>)}
                				</FormItem>
              			</Col>
						<Col span={12}>
			                <FormItem label="用户账号" hasFeedback {...formItemLayout2}>
			                  {getFieldDecorator("user", {
			                    rules: [{ required: true, message: "请输入长度为6到20位账号！",pattern: /^[a-zA-Z0-9]{6,20}$/ }]
			                  })(<Input placeholder="用户账号" disabled={data?true:false} />)}
			                </FormItem>
						</Col>
					</Row>
					{
						data ? null:
							<Row>
								<Col span={12}>
		                				<FormItem {...formItemLayout2} label="用户密码" hasFeedback>
										{getFieldDecorator("pwd", {
						                    rules: [
						                      { required: true, message: "请输入长度为6到20位的数字、字母密码!", pattern: /^[a-zA-Z0-9]{6,20}$/ },
						                    ]
			                  			})(<Input type="password" placeholder="用户密码" />)}
			                			</FormItem>
								</Col>
								<Col span={12}>
		                				<FormItem {...formItemLayout2} label="确认密码" hasFeedback>
										{getFieldDecorator("pwd1", {
						                    rules: [ { required: true, message: "请再次输入密码!" },
						                      		{ validator: this.checkPassword }
						                    			]
										})(
						                    <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次输入密码" />
										)}
				         			</FormItem>
								</Col>
							</Row>
					}
					<Row>
            				<Col span={12}>
	                			<FormItem label="联系电话" hasFeedback {...formItemLayout2}>
	                  			{getFieldDecorator("tel", {
	                    				rules: [{ required: true, message: "请输入联系电话！" }]
	                  			})(<Input placeholder="请输入联系电话" disabled={data?true:false}/>)}
	                			</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout2} label="邮箱" hasFeedback>
	                  			{getFieldDecorator("mailbox", {
	                    				rules: [{ required: true, message: "请输入正确的邮箱!",pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ }]
	                  			})(<Input placeholder="邮箱" disabled={data?true:false}/>)}
	                			</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem label="是否启用" hasFeedback {...formItemLayout2}>
								{getFieldDecorator("isEnable", {
									rules: [{ required: true, message: "请选择状态！" }]
								})(
					                <RadioGroup onChange={this.onChange}>
										<Radio value={1}>启用</Radio>
										<Radio value={0}>禁用</Radio>
					                </RadioGroup>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="用户角色" hasFeedback {...formItemLayout2}>
								{getFieldDecorator("role", {
		              				initialValue: '',
		              	 			rules: [{ required: true, message: "请选择用户角色！" }]
		              			})(
		                				<Select>
					               		{
					               			dict.map((item,i)=>
					               				<Option key={i}  value={item.code}>{item.name}</Option>
					               			)
					               		}
		                				</Select>
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
