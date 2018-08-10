/**
 * 评论列表页
 */
import React, { Component } from "react";
import { Modal } from "antd";
import { connect } from 'dva';
import moment from "moment";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';

const confirm = Modal.confirm;
@connect(({ Speech }) => ({ $data:Speech }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageSize:10,
			pageNumber: 1,
			id:this.props.match.params.id
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.fetch();
	}
	//数据
	fetch = () => {
		const { pageSize, pageNumber, id } = this.state;
		this.props.dispatch({type: 'Speech/list', payload: { pageSize, pageNumber, id }});
	}
	//审核评论
	Auditing = (item) => {
		let isCheck = Number(item.isCheck) ? 0 : 1;
		this.props.dispatch({type: 'Speech/assess', payload: { id:item.id, isCheck}});
	}
	//删除
	del = (item) => {
		const $this = this;
	    confirm({
			title: "确定删除吗?",
			content: "删除之后数据不能恢复",
			onOk() {
				$this.props.dispatch({type: 'Speech/del', payload: { id: item.id}});
			},
			onCancel() {}
		});
	}
	//分页
	changePage = (pageNumber) =>{
		this.setState({
			pageNumber: pageNumber
		},this.fetch);
	}
	render() {
		const { pageNumber, pageSize } = this.state;
		const { data, total, loading } = this.props.$data;
		//表格配置
	    const columnsConfig = [
	      { title: "留言人", dataIndex: "author" },
	      { title: "发布时间", dataIndex: "time",
	      	render: (txt) => {
	      		return moment(Number(txt)).format('YYYY-MM-DD hh:mm');
	      	}
	      },
	      { title: "内容", dataIndex: "content" },
	      { title: "审核通过", dataIndex: "isCheck",
	      	render:(txt)=>{
	      		return Number(txt)?'通过':'未通过';
	      	}
	      },
	      {
	        title: "操作",
	        dataIndex: "operator",
	        width:120,
	        render: (text, record, index) => {
	          return (
	            <div>
	              <span className="view-span" onClick={() => this.Auditing(record)}>
	              	{
	              		Number(record.isCheck)?'取消审核':'审核'
	              	}
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
				<Breadcrumb data={['随笔管理',{name:'随笔列表',path:'/essay/essayList'},'评论列表']}/>
				<TableBar config={TableConfig}/>
			</div>
		);
	}
}
export default IndexPage;