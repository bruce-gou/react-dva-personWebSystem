/**
 * 数据字典
 */
import React, { Component } from "react";
import {  Row, Col, Modal } from "antd";
import { connect } from 'dva';
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';
import SearchBar from '@/components/base/SearchBar.js';
import AddTopic from "../view/addTopic.js";
import AddDict from "../view/addDict.js";

const confirm = Modal.confirm;
@connect(({ Dict }) => ({ $data:Dict }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selects:null,
			visible:false,
			visibleDict:false,
			title:null,
			rowData:null, //类型行数据
			rowEditData:null, //字典行数据
		};
	}
	componentWillMount(){
		
	}
	componentDidMount(){
		this.props.dispatch({type: 'Dict/typeList'});
	}
	//数据
	fetch = (code) => {
		this.props.dispatch({type: 'Dict/list', payload: {id: code}});
	}
	//类型整行点击
	roleOnRowClick = (item) => {
		const { selects } = this.state;
		if(selects && selects[0] === item.id){
			return;
		}
		this.setState({
			selects:[item.id],
			rowData: item
		},()=>this.fetch(item.id))
	}
	//新增
	add = () => {
		this.setState({
			visible:true
		})
	}
	//添加 字典
	addDict = (item) => {
		this.setState({
			title:'新增字典',
			visibleDict:true,
			rowData: item,
			rowEditData:null
		})
	}
	//编辑
	edit = (item) => {
		this.setState({
			title:'编辑字典',
			visibleDict:true,
			rowEditData: item
		})
	}
	//删除
	del = (item,flg) => {
		const $this = this;
		let content = '删除之后数据不能恢复';
		if(flg){
			content = '删除之后将删除该类型下的字典数据';
		}
	    confirm({
			title: "确定删除吗?",
			content: content,
			onOk:()=>{
				if(flg){//删除类型
					this.props.dispatch({type: 'Dict/typeDel', payload: {id: item.id}});
				}else{//删除字典
					this.props.dispatch({type: 'Dict/del', payload: {id: item.id}});
				}
			},
			onCancel() {}
		});
	}
	//取消
	cancel = () =>{
		this.setState({
			visible:false,
			visibleDict:false
		})
	}
	render() {
		const { selects, visible, visibleDict, title, rowData, rowEditData } = this.state;
		const { loading, typeData, data } = this.props.$data;
		const SearchConfig = {
			btn: [ { text: "新增", onClick: this.add }],
		};
		//表格配置
	    const roleTableColumn = [
	    		 { title: "字典类型", dataIndex: "name"},
	    		 {title: "操作", 
	    		 	dataIndex: "operation",
	    		 	width:100,
	    		 	render: (text, record) => {
					return (
						<div>
							<span className="view-span" onClick={() => this.addDict(record)}>添加</span>
							<span className="delete-span" onClick={() => this.del(record,true)}>删除</span>
						</div>
		          	);
		        }
	    		 }
	    		 
	    ]
	    const resouTableColumn = [
	      { title: "字典名称", dataIndex: "name", width:'40%'},
	      { title: "code", dataIndex: "code", width:'40%'},
	      {
	        title: "操作",
	        dataIndex: "operation",
	        width: '20%',
	        render: (text, record) => {
	          return (
	            <div>
            			<span className="view-span" onClick={() => this.edit(record)}> 编辑</span>
    					<span className="delete-span" onClick={() => this.del(record,false)}> 删除 </span>
	            </div>
	          );
	        }
	      }
	    ];
	    //类型
	    const roleTable = {
	      dataSource: typeData,
	      columns: roleTableColumn,
	      loading: false,
	      pagination:false,
	      isBordered: true,
	      scroll:{y:600},
	      onRow:(record)=>({
	      	onClick:()=>this.roleOnRowClick(record)
	      }),
	      rowSelection:{
	      	type:'radio',
//	      	onChange:this.selects,
	      	selectedRowKeys:selects
	      }
	    };
	     //字典
	    const resouTable= {
	      dataSource: data,
	      columns: resouTableColumn,
	      pagination:false,
	      loading: loading,
	      isBordered: true,
	      scroll:{y:600}
	    };
		return(
			<div>
				<Breadcrumb data={['系统管理','数据字典']}/>
				<SearchBar config={SearchConfig} />
				<Row>
					<Col span={8} className="roleTable">
		        			 <TableBar config={roleTable} />
		        		</Col>
		        		<Col span={15} style={{marginLeft:'20px'}}>
		        			 <TableBar config={resouTable} />
		        		</Col>
	        		</Row>
	        		{ visible ? <AddTopic visible={visible} handleCancel={this.cancel}/> : null }
	        		{ visibleDict ? <AddDict visible={visibleDict} handleCancel={this.cancel} title={title} data={rowData} editData={rowEditData}/> : null }
			</div>
		);
	}
}
export default IndexPage;