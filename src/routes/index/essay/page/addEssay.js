/**
 * 新增随笔
 */
import React, { Component } from "react";
import { Form, Select, Col, Row, Input, Icon, Button, Upload, Message} from "antd";
import { connect } from 'dva';
import moment from "moment";
import { getDict } from "@/utils/tool";
import styles from "./style.less";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import Edit from "@/components/base/edit.js"

const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ Essay }) => ({ $data:Essay }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editContent:'',
			fileList:[]
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	//内容变化
	change = (e) => {
		this.setState({
			editContent: e
		})
	}
	//提交
	submitHandle = e => {
		const $this = this;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { editContent, id } = this.state;
				if(!editContent){
					Message.error('请填写考核说明！');
					return;
				}
				values.content = editContent;
				values.time = Date.now();
				this.props.dispatch({type: 'Essay/add', payload: values});
			}
		});
	};
	render() {
		const {id, editContent } = this.state;
		const { detail } = this.props.$data;
		const { getFieldDecorator } = this.props.form;
		const dict = getDict('随笔类型');
		const formItemLayout = {
			labelCol: { lg: { span: 3 }},
			wrapperCol: { lg: { span: 16 }}
		};
		const formItemLayout1 = {
			labelCol: { lg: { span: 3 }},
			wrapperCol: { lg: { span: 5 }}
		};
		const tailFormItemLayout = {
			wrapperCol: {
        			xs: { span: 24, offset: 0,},
        			sm: { span: 14, offset: 3}
			}
		};
		return(
			<div>
				<Breadcrumb data={['随笔管理',{name:'随笔列表',path:'/essay/essayList'},'新增随笔']}/>
				<div className={styles.content}>
					<Form>
						<Row>
							<Col span={24}>
								<FormItem {...formItemLayout} label="标题" hasFeedback>
						            {getFieldDecorator("title", {
						              initialValue: '',
						              rules: [{ required: true, message: '请填写标题' }]
						            })(
						            		<Input placeholder="请输入随笔标题"/>
						            )}
						          </FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<FormItem {...formItemLayout} label="内容">
						            <div className="editor">
						            		<Edit onChange={this.change}/>
					             	</div>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<FormItem {...formItemLayout1} label="类别" hasFeedback>
						            {getFieldDecorator("typeId", {
						              initialValue: '',
						              rules: [{ required: true, message: '请选择类别' }]
						            })(
						            		<Select>
						            			{
						            				dict.map((item,i)=>
						            					<Option key={i} value={item.code}>{item.name}</Option>
						            				)
						            			}
						            		</Select>
						            )}
						          </FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<FormItem {...formItemLayout1} label="发布" hasFeedback>
						            {getFieldDecorator("isPublish", {
						              initialValue: '',
						              rules: [{ required: true, message: '请选择类别' }]
						            })(
						            		<Select>
						            			<Option  value="1">是</Option>
						            			<Option  value="0">否</Option>
						            		</Select>
						            )}
						          </FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<FormItem {...tailFormItemLayout}  hasFeedback>
									<Button type="primary" size="large" style={{width:'120px'}} onClick={this.submitHandle} >提交</Button>
						        </FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		);
	}
}
export default Form.create()(IndexPage);