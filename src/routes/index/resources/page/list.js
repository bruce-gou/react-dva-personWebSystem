/**
 * 随笔列表页
 */
import React, { Component } from "react";
import { Modal } from "antd";
import { connect } from 'dva';
import moment from "moment";
import { getDict } from "@/utils/tool";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';
import SearchBar from '@/components/base/SearchBar.js';
import Add from '../view/add.js';

const confirm = Modal.confirm;
@connect(({ Resources }) => ({ $data:Resources }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageSize:10,
			pageNumber: 1,
			visible: false,
			title: null,
			rowData:null,
			typeId:null, //类型
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.fetch();
	}
	//数据
	fetch = () => {
		const { pageSize, pageNumber, typeId } = this.state;
		const data = { pageSize, pageNumber, typeId};
		this.props.dispatch({type: 'Resources/list', payload: data});
	}
	//类型筛选
	typeSelect = (e) => {
		this.setState({
			typeId: e
		},this.fetch)
	}
	//新增
	add = () => {
		this.setState({
			title:'新增资源',
			visible: true,
			rowData:null
		})
	}
	//编辑
	edit = (item) => {
		this.setState({
			title:'编辑资源',
			visible: true,
			rowData: item
		})
	}
	//删除
	del = (item) => {
		const $this = this;
	    confirm({
			title: "确定删除吗?",
			content: "删除之后数据不能恢复",
			onOk() {
				$this.props.dispatch({type: 'Resources/del', payload: { id: item.id}});
			},
			onCancel() {}
		});
	}
	//分页
	changePage = (pageNumber) => {
		this.setState({
			pageNumber: pageNumber
		},this.fetch);
	}
	//关闭
	cancel = () =>{
		this.setState({
			visible: false
		})
	}
	render() {
		const { pageNumber, pageSize, visible, title, rowData } = this.state;
		const { data, total, loading } = this.props.$data;
		const dict = getDict('资源类型');
		const searchConfig = {
			btn:[{text:'新增',onClick:this.add}],
			select:[{placeholder:'类型筛选',data:dict, allowClear:true,onChange:this.typeSelect}]
		}
		//表格配置
	    const columnsConfig = [
	      { title: "资源名称", dataIndex: "name" },
	      { title: "路径", dataIndex: "url" },
	      { title: "类型", dataIndex: "typeId" ,
	      	render:(txt)=>{
	      		for(let i in dict){
	      			if(txt === Number(dict[i].code)){
	      				return dict[i].name;
	      			}
	      		}
	      	}
	      },
	      {
	        title: "操作",
	        dataIndex: "operator",
	        width:120,
	        render: (text, record, index) => {
	          return (
	            <div>
	              <span className="view-span" onClick={() => this.edit(record)}>
	                编辑
	              </span>
	              <span className="delete-span" onClick={() => this.del(record)} >
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
		        current: pageNumber,
		        pageSize: pageSize,
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
				<Breadcrumb data={['随笔管理','随笔列表']}/>
				<SearchBar config={searchConfig}/>
				<TableBar config={TableConfig}/>
				{ visible ? <Add visible={visible} title={title} handleCancel={this.cancel} data={rowData}/> : null}
			</div>
		);
	}
}
export default IndexPage;