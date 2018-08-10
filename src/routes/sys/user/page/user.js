/**
 * 数据字典
 */
import React, { Component } from "react";
import {  Row, Col, Modal, Tree, Icon } from "antd";
import { connect } from 'dva';
import { getDict } from "@/utils/tool";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';
import SearchBar from '@/components/base/SearchBar.js';
import styles from '../style.less';
//引入组件
import AddUser from "../view/addUser.js";
import RestPassword from "../view/RestPassword.js";

const confirm = Modal.confirm;
const TreeNode = Tree.TreeNode;
@connect(({ User }) => ({ $data: User }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageSize:10,
			pageNumber:1,
			visible:false,
			visiblePwd:false,
			rowData:null,
			title:null,
			name:null
		};
	}
	componentDidMount(){
		this.fetch();
	}
	//数据
	fetch = () => {
		const { pageSize, pageNumber, name} = this.state;
		const data = { pageSize, pageNumber, name };
		this.props.dispatch({type:'User/list', payload: data });
	}
	//search
	search = (e) => {
		this.setState({
			name: e
		},this.fetch)
	}
	//新增
	add = () => {
		this.setState({
			title:'新增用户',
			visible:true,
			rowData: null
		})
	}
	//编辑
	edit = (item) => {
		this.setState({
			title:'编辑用户',
			visible:true,
			rowData: item
		})
	}
	del = (item) => {
		const $this = this;
	    confirm({
			title: "确定删除吗?",
			content: "删除之后数据不能恢复",
			onOk() {
				$this.props.dispatch({type:'User/del', payload: item.id });
			},
			onCancel() {}
		});
	}
	//重置密码
	restPwd = (item) => {
		this.setState({
			visiblePwd:true,
			rowData:item
		})
	}
	//取消
	cancel = () =>{
		this.setState({
			visible:false,
			visiblePwd:false
		})
	}
	render() {
		const { pageSize, pageNumber,  visible, visiblePwd, title, rowData } = this.state;
		const { data, total, loading } = this.props.$data;
		const dict = getDict('用户角色');
		const SearchConfig = {
			btn: [ { text: "新增", onClick: this.add }],
			search:[{onSearch:this.search}]
		};
		const loop = data => data.map((item) => {
			if (item.children && item.children.length) {
	        		return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
	      	}
			return <TreeNode key={item.key} title={item.key} />;
	    });
	    const resouTableColumn = [
	      { title: "用户名", dataIndex: "user", width:'10%'},
	      { title: "姓名", dataIndex: "name",width:'10%'},
	      { title: "角色", dataIndex: "role",width:'10%',
	      	render:(txt)=>{
	      		for(let i in dict){
	      			if(dict[i].code === txt){
	      				return dict[i].name;
	      			}
	      		}
	      	}
	      },
	      { title: "电话", dataIndex: "tel",width:'20%'},
	      { title: "邮箱", dataIndex: "mailbox",width:'20%'},
	      { title: "是否启用", dataIndex: "isEnable",width:'10%',
	      	render:(txt)=>{
	      		return Number(txt) === 0 ? 
	      			<Icon type="close-circle" className="red"/> 
	      			:
	      			<Icon type="check-circle" className="green"/>;
	      	}
	      },
	      {
	        title: "操作",
	        dataIndex: "operation",
	        width: '20%',
	        render: (text, record) => {
	          return (
	            <div>
	            		<span className="view-span" onClick={() => this.restPwd(record)}> 重置密码</span>
            			<span className="view-span" onClick={() => this.edit(record)}> 编辑</span>
    					<span className="delete-span" onClick={() => this.del(record)}> 删除 </span>
	            </div>
	          );
	        }
	      }
	    ];
	    const resouTable= {
	      dataSource: data,
	      columns: resouTableColumn,
	      pagination:false,
	      loading: loading,
	      isBordered: true,
	      pagination: {
	        current: pageNumber,
	        pageSize: pageSize,
	        total: total,
	        onChange: this.changePage,
	        showTotal: (total, range) =>
	          `共 ${total} 条  显示  ${range[0]}-${range[1]} 条`,
	        showSizeChanger: false,
	        showQuickJumper: false,
	      }
	    };
		return(
			<div>
				<Breadcrumb data={['系统管理','用户管理']}/>
				<SearchBar config={SearchConfig} />
	        		<TableBar config={resouTable} />
	        		{ visible ? <AddUser visible={visible} handleCancel={this.cancel} title={title} data={rowData}/> : null }
	        		{ visiblePwd ? <RestPassword visible={visiblePwd} handleCancel={this.cancel} data={rowData}/> : null }
			</div>
		);
	}
}
export default IndexPage;