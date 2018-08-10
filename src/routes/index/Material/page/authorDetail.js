/**
 * 作者列表详情页
 */

import React, { Component } from "react";
import {
  Modal,Form,Button,Input,Col,Row,Select
} from "antd";
import moment from "moment";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';
import AddAuthorLife from '../view/addAuthorLife.js';


const FormItem = Form.Item;
const Option = Select.Option;
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible:false
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
	//add
	add = () => {
		this.setState({
			visible:true
		})
	}
	//关闭弹窗
	cancel = () => {
		this.setState({
			visible:false
		})
	}
	render() {
		const { visible } = this.state;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { lg: { span: 9 }},
			wrapperCol: { lg: { span: 12 }}
		};
		const otherLayout = {
			labelCol: { lg: { span: 2 }},
			wrapperCol: { lg: { span: 22 }}
		};
		//表格配置
		const columnsConfig = [
			{ title: "年", dataIndex: "t1" },
			{ title: "朝代", dataIndex: "t2" },
			{ title: "属国", dataIndex: "t3" },
			{ title: "统治者", dataIndex: "t8" },
			{ title: "年号", dataIndex: "t4" },
			{ title: "地点", dataIndex: "t5" },
			{ title: "事件", dataIndex: "t6" },
			{
				title: "操作",
				dataIndex: "operator",
				render: (text, record, index) => {
					return (
						<div>
							<span className="delete-span" onClick={() => this.viewDetail(record)}> 删除</span>
						</div>
					);
				}
			}
		];
		const TableConfig = {
			dataSource: [],
			columns: columnsConfig,
			loading: false,
			pagination: {
				current: 1,
		        pageSize: 10,
		        total: 0,
		        onChange: this.changePage,
		        showTotal: (total, range) =>
		          `共 ${total} 条  显示  ${range[0]}-${range[1]} 条`,
		        showSizeChanger: true,
		        showQuickJumper: true,
			},
			isBordered: true
		};
		return (
			<div>
				<Breadcrumb data={['素材管理',{name:"作者",path:"/material/author"},'详情']}/>
				{ visible ? <AddAuthorLife visible={visible} handleCancel={this.cancel}/> : null }
				<Form>
					<Row>
						<Col span={8}>
							<FormItem {...formItemLayout} label="作者名称" hasFeedback>
								{getFieldDecorator("atype", {
				            			initialValue:'',
				            			rules: [{ required: true, message: '请填写作者名称' }]
				            		})(
				            			<Input />
				            		)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="生于" hasFeedback>
					            {getFieldDecorator("atype1", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="出生地经度" hasFeedback>
					            {getFieldDecorator("atype2", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择形式' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<FormItem {...formItemLayout} label="字" hasFeedback>
					            {getFieldDecorator("atype3", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择细类' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="出生地" hasFeedback>
					            {getFieldDecorator("atype4", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="出生地纬度" hasFeedback>
					            {getFieldDecorator("t1", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<FormItem {...formItemLayout} label="号" hasFeedback>
					            {getFieldDecorator("t2", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择细类' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="民族" hasFeedback>
					            {getFieldDecorator("t3", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="死亡地经度" hasFeedback>
					            {getFieldDecorator("t4", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<FormItem {...formItemLayout} label="朝代" hasFeedback>
					            {getFieldDecorator("t5", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择细类' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="籍贯" hasFeedback>
					            {getFieldDecorator("t6", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="死亡地纬度" hasFeedback>
					            {getFieldDecorator("t7", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<FormItem {...formItemLayout} label="属国" hasFeedback>
					            {getFieldDecorator("t8", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择细类' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="享年" hasFeedback>
					            {getFieldDecorator("t9", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Input />
					            	)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem {...formItemLayout} label="生死地是否一致" hasFeedback>
					            {getFieldDecorator("t10", {
					            		initialValue:'',
					            		rules: [{ required: true, message: '请选择题材' }]
					            })(
					            		<Select>
					            			<Option value='是'>是</Option>
					            			<Option value='否'>否</Option>
					            		</Select>
					            	)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Button onClick={this.add}>添加</Button>
						<TableBar config={TableConfig}/>
					</Row>
					<Row>
						<FormItem>
				          <Button type="primary" htmlType="submit"> 发布 </Button>
				        </FormItem>
					</Row>
				</Form>
			</div>
		);
	}
}
export default Form.create()(IndexPage);