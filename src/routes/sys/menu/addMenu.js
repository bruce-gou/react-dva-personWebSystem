/**
 * 新增菜单
 */

import React, { Component } from "react";
import { Modal, Form, Button, Input, Select, Radio, Checkbox, InputNumber, Col, Row
		} from "antd";
import { connect } from 'dva';
import { getDict } from "@/utils/tool";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
@connect(({ Menu }) => ({ $data: Menu }))
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuIcon: [],
			rowrecord: null,
			
		};
	}
	componentDidMount() {
		const { data } = this.props;
		if(data && data.type === 'edit'){//编辑
	  		let val = {
	      		name:data.name,
	      		path:data.path,
	      		icon:data.icon,
	      		orderNumber:data.orderNumber,
	      		allPower:data.allPower
	      	};
	      	this.props.form.setFieldsValue(val);
		}
	}
	//提交
	submitHandle = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				const { data } = this.props;
				if(data && data.type === 'edit'){//编辑
					values.id = data.id;
					this.props.dispatch({type:'Menu/edit',payload: values});
				}else if( data && data.type === 'add'){//新增子级
					values.parentId = data.id;
					this.props.dispatch({type:'Menu/add',payload: values});
				}else{//新增父级
					values.parentId = 0;
					this.props.dispatch({type:'Menu/add',payload: values});
				}
				this.props.handleCancel();
			}
		});
	};
	render() {
		const { handleCancel, visible, title, data } = this.props;
		const { rowrecord, type, menuIcon } = this.state;
		const { getFieldDecorator } = this.props.form;
		const icons = getDict('菜单图标');
		const menuPower = getDict('菜单权限');
		const formItemLayout = {
			labelCol: { sm: { span: 6 } },
			wrapperCol: { sm: { span: 14 } }
		};
		return(
			<Modal
		        title={title}
		        visible={visible}
		        onCancel={handleCancel}
		        maskClosable={false}
		        onOk={this.submitHandle}
		      >
				<Form onSubmit={this.submitHandle}>
					<FormItem {...formItemLayout} label="菜单名称">
						{getFieldDecorator("name", {
							initialValue: '',
							rules: [{ required: true, message: "请填写名称" }]
						})(<Input placeholder="名称" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="icon">
			            {getFieldDecorator("icon", {
			              initialValue: '',
			              rules: [{ required: false, message: "请选择icon" }]
			            })(
			              <Select allowClear={true}>
							{
			                		icons.map((item, i) => (
			                      <Option value={item.code} key={i}>
									{item.name}
			                      </Option>
			                    ))
							}
			              </Select>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="path">
			            {getFieldDecorator("path", {
			              initialValue: '',
			               rules: [{ required: true, message: "请填写路径!" }]
			            })(<Input placeholder="path" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="序号">
			            {getFieldDecorator("orderNumber", {
			              initialValue: '',
			              rules: [{ required: true, message: "请填写序号!" }]
			            })(<InputNumber min={1} placeholder="序号" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="菜单权限">
			            {getFieldDecorator("allPower", {
			              initialValue: '',
			              rules: [{ required: true, message: "请选择菜单权限!" }]
			            })(
			            		<CheckboxGroup>
			            			{
			            				menuPower.map((item,i)=>
			            					<Checkbox key={i} value={item.code}>{item.name}</Checkbox>
			            				)
			            			}
			            		</CheckboxGroup>
			            	)}
					</FormItem>
					{
						data && data.type === 'edit' ? 
							null
							:
							<FormItem {...formItemLayout} label="启用">
					            {getFieldDecorator("isEnable", {
					              initialValue: '',
					              rules: [{ required: true, message: "请选择!" }]
					            })(
					              <RadioGroup>
					                <Radio value={1}>启用</Radio>
					                <Radio value={0}>停用</Radio>
					              </RadioGroup>
					            )}
							</FormItem>
					}
		        </Form>
			</Modal>
		);
	}
}
export default Form.create()(Index);