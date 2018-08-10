/**
 * 诗词列表页
 */
import React, { Component } from "react";
import {  Modal, Icon } from "antd";
import { connect } from 'dva';
import { getDict } from "@/utils/tool";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';
import SearchBar from '@/components/base/SearchBar.js';
import AddMenu from './addMenu.js';


const confirm = Modal.confirm;
@connect(({ Menu }) => ({ $data: Menu }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible:false,
			title:null,
			rowData:null
		};
	}
	componentWillMount(){
		this.fetch();
	}
	//数据
	fetch = () => {
		this.props.dispatch({type:'Menu/list'});
	}
	//新增父级
	add = () => {
		this.setState({
			visible:true,
			title:'新增菜单',
			rowData: null
		})
	}
	//新增子级
	add1 = (item) => {
		this.setState({
			visible:true,
			title:'新增菜单',
			rowData: { ...item, type:'add'}
		})
	}
	//编辑
	edit = (item) => {
		this.setState({
			visible:true,
			title:'编辑菜单',
			rowData: { ...item, type:'edit'}
		})
	}
	//删除
	del = (item) => {
		const $this = this;
	    confirm({
			title: "确定删除吗?",
			content: "删除之后数据不能恢复",
			onOk() {
				$this.props.dispatch({type:'Menu/del', payload: {id:item.id}});
			},
			onCancel() {}
		});
	}
	//菜单启用/禁用
	menuEnable = ( item, val ) => {
		this.props.dispatch({type:'Menu/menuEnable', payload: {id:item.id, isEnable: val }});
	}
	//取消
	cancel = () =>{
		this.setState({
			visible:false
		})
	}
	render() {
		const { selects, visible, title, rowData } = this.state;
		const { data, loading, total } = this.props.$data;
		const menuPower = getDict('菜单权限');
		const SearchConfig = {
			btn: [ { text: "新增", onClick: this.add }],
		};
		const data1 = [
			{t1:'素材管理',t2:'key',t3:'/menu',t4:'管理员',id:0,
				children:[{t1:'内容',t2:'key',t3:'/menu/substance',t4:'管理员',id:1}]
			}
		]
		//表格配置
	    const columnsConfig = [
	      { title: "菜单名称", dataIndex: "name" },
	      { title: "path", dataIndex: "path" },
	      { title: "菜单权限", dataIndex: "allPower",
	      	render:(txt, record)=>{
	      		const item = {...record};
	      		const power = item.allPower;
	      		let arr = [];
	      		for(let i in power){
	      			for(let j in menuPower){
	      				if(power[i] === menuPower[j].code){
	      					arr.push(menuPower[j].name);
	      				}
	      			}
	      		}
	      		return arr.join(',');
	      	}
	      },
	      { title: "icon", dataIndex: "icon" ,
	      		render: (txt) => {
	      			return <Icon type={txt}/>
	      		}
	      },
	      { title: "序号", dataIndex: "orderNumber" },
	      { title: "是否启用", dataIndex: "isEnable",
	      	render:(txt)=>{
	      		return Number(txt) === 0 ? 
	      			<Icon type="close-circle" className="red"/> 
	      			:
	      			<Icon type="check-circle" className="green"/>;
	      	}
	      },
	      {
	        title: "操作",
	        dataIndex: "operator",
	        width:180,
	        render: (text, record, index) => {
	          return (
	            <div>
	              <span className="view-span" onClick={() => this.add1(record,true)} >
	                新增
	              </span>
	              <span className="view-span" onClick={() => this.edit(record)} >
	                编辑
	              </span>
	              {
	              	record.isEnable === 0 ? 
	              		<span className="view-span" onClick={() => this.menuEnable(record,1)} >
			                启用
						</span>
						:
						<span className="delete-span" onClick={() => this.menuEnable(record,0)}>
							禁用
						</span>
	              }
	              <span className="delete-span" onClick={() => this.del(record)}>
	                删除
	              </span>
	            </div>
	          );
	        }
	      }
	    ];
		const TableConfig = {
		      dataSource: data,
		      columns: columnsConfig,
		      loading: loading,
		      pagination: {
		        current: 1,
		        pageSize: 5,
		        total: total,
		        onChange: this.changePage,
		        showTotal: (total, range) =>
		          `共 ${total} 条  显示  ${range[0]}-${range[1]} 条`,
		        showSizeChanger: false,
		        showQuickJumper: false,
		      },
		      isBordered: true
		    };
		return(
			<div>
				<Breadcrumb data={['系统管理','菜单管理']}/>
				<SearchBar config={SearchConfig} />
				<TableBar config={TableConfig}/>
				{ visible ? <AddMenu visible={visible} handleCancel={this.cancel} title={title} data={rowData}/> : null }
			</div>
		);
	}
}
export default IndexPage;