/**
 * 诗词列表详情页
 */

import React, { Component } from "react";
import {
  Modal,Form,Button,Input,Col,Row,Select
} from "antd";
import moment from "moment";
import Breadcrumb from '@/components/base/breadcrumb.js';


const FormItem = Form.Item;
const Option = Select.Option;
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
	componentDidMount() {
	}
	submitHandle = e => {
		const $this = this;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	}
	});
  };
  render() {
    const { getFieldDecorator } = this.props.form;
	const formItemLayout = {
		labelCol: { lg: { span: 6 }},
		wrapperCol: { lg: { span: 18 }}
	};
	const otherLayout = {
		labelCol: { lg: { span: 2 }},
		wrapperCol: { lg: { span: 22 }}
	};
    return (
        <div>
        		<Breadcrumb data={['素材管理',{name:"内容",path:"/material/substance"},'详情']}/>
        		<Form>
    				<Row>
					<Col span={24}>
						<FormItem {...otherLayout} label="文章名称" hasFeedback>
				            {getFieldDecorator("assessmentReason", {
				              initialValue: '',
				              rules: [{ required: true, message: '请填写文章名称' }]
				            })(
				            		<Input maxLength='50' placeholder='最多50字'/>
				            	)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem {...formItemLayout} label="朝代" hasFeedback>
				            {getFieldDecorator("atype", {
				            		initialValue:'',
				            		rules: [{ required: true, message: '请选择朝代' }]
				            })(
				            		<Select placeholder='请选择'>
				            			<Option value='1'>123</Option>
				            		</Select>
				            	)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem {...formItemLayout} label="作者" hasFeedback>
				            {getFieldDecorator("atype1", {
				            		initialValue:'',
				            		rules: [{ required: true, message: '请选择作者' }]
				            })(
				            		<Select placeholder='请选择'>
				            			<Option value='1'>123</Option>
				            		</Select>
				            	)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem {...formItemLayout} label="形式" hasFeedback>
				            {getFieldDecorator("atype2", {
				            		initialValue:'',
				            		rules: [{ required: true, message: '请选择形式' }]
				            })(
				            		<Select placeholder='请选择'>
				            			<Option value='1'>123</Option>
				            		</Select>
				            	)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem {...formItemLayout} label="细类" hasFeedback>
				            {getFieldDecorator("atype3", {
				            		initialValue:'',
				            		rules: [{ required: true, message: '请选择细类' }]
				            })(
				            		<Select placeholder='请选择'>
				            			<Option value='1'>123</Option>
				            		</Select>
				            	)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem {...formItemLayout} label="题材" hasFeedback>
				            {getFieldDecorator("atype4", {
				            		initialValue:'',
				            		rules: [{ required: true, message: '请选择题材' }]
				            })(
				            		<Select placeholder='请选择'>
				            			<Option value='1'>123</Option>
				            		</Select>
				            	)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<FormItem {...otherLayout} label="文章内容" hasFeedback>
				            {getFieldDecorator("assessmentReason", {
				              initialValue: '',
				              rules: [{ required: true, message: '请填写' }]
				            })(
				            		<Input.TextArea rows="10" placeholder='请填写考核说明' />
				            	)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<FormItem {...otherLayout} label="释义" hasFeedback>
				            {getFieldDecorator("assessmentReason", {
				              initialValue: '',
				              rules: [{ required: true, message: '请填写' }]
				            })(
				            		<Input.TextArea rows="10" placeholder='请填写释义' />
				            	)}
						</FormItem>
					</Col>
				</Row>
			</Form>
        </div>
    );
  }
}
export default Form.create()(IndexPage);