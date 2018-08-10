/**
 * 新增资源
 */
import React, { Component } from "react";
import { Form, Select, Col, Row, Input, Button, Modal} from "antd";
import { connect } from 'dva';
import moment from "moment";
import { getDict } from "@/utils/tool";


const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ Resources }) => ({ $data:Resources }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
		const { data } = this.props;
		if(data){
	  		let val = {
	  			name:data.name,
	      		url:data.url,
	      		typeId:`${data.typeId}`
	      	};
	      	this.props.form.setFieldsValue(val);
		}
	}
	//提交
	submitHandle = e => {
		const $this = this;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { data } = this.props;
				if(data){//编辑
					values.id = data.id;
					$this.props.dispatch({type: 'Resources/edit', payload: values});
				}else{
					$this.props.dispatch({type: 'Resources/add', payload: values});
				}
				$this.props.handleCancel();
			}
		});
	};
	render() {
		const { visible, handleCancel, title } = this.props;
		const { getFieldDecorator } = this.props.form;
		const dict = getDict('资源类型');
		const formItemLayout = {
			labelCol: { lg: { span: 3 }},
			wrapperCol: { lg: { span: 16 }}
		};
		return(
			<Modal
			title={title}
			visible={visible}
			onCancel={handleCancel}
			maskClosable={false}
			onOk={this.submitHandle}
			>
				<Form>
					<Row>
						<Col span={24}>
							<FormItem {...formItemLayout} label="名称" hasFeedback>
					            {getFieldDecorator("name", {
					              initialValue: '',
					              rules: [{ required: true, message: '请填写名称' }]
					            })(
					            		<Input/>
					            )}
					          </FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<FormItem {...formItemLayout} label="路径" hasFeedback>
					            {getFieldDecorator("url", {
					              initialValue: '',
					              rules: [{ required: true, message: '请填写路径' }]
					            })(
					            		<Input/>
					            )}
					          </FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<FormItem {...formItemLayout} label="类别" hasFeedback>
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
				</Form>
			</Modal>
		);
	}
}
export default Form.create()(IndexPage);