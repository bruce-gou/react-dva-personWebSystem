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

const confirm = Modal.confirm;
@connect(({ Essay }) => ({ $data:Essay }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageSize:10,
			pageNumber: 1,
			typeId: null
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
		const data = { pageSize, pageNumber, typeId };
		this.props.dispatch({type: 'Essay/list', payload: data});
	}
	//类型筛选
	typeSelect = (e) => {
		this.setState({
			typeId: e
		},this.fetch)
	}
	//新增
	add = () => {
		this.props.history.push('/essay/addEssay');
	}
	//编辑
	edit = (item) => {
		this.props.history.push(`/essay/editEssay/${item.id}`);
	}
	//查看评论
	checkComment = (item) => {
		this.props.history.push(`/essay/speech/${item.id}`);
	}
	//删除
	del = (item) => {
		const $this = this;
	    confirm({
			title: "确定删除吗?",
			content: "删除之后数据不能恢复",
			onOk() {
				$this.props.dispatch({type: 'Essay/del', payload: { id: item.id}});
			},
			onCancel() {}
		});
	}
	//查看详情
	viewDetail = (item) => {
		this.props.history.push('/material/substanceDetail');
	}
	//分页
	changePage = (pageNumber) => {
		this.setState({
			pageNumber: pageNumber
		},this.fetch);
	}
	render() {
		const { pageNumber, pageSize } = this.state;
		const { data, total, loading } = this.props.$data;
		const dict = getDict('随笔类型');
		const searchConfig = {
			btn:[{text:'新增',onClick:this.add}],
			select:[{placeholder:'类型筛选',data:dict, allowClear:true,onChange:this.typeSelect}]
		}
		//表格配置
	    const columnsConfig = [
	      { title: "文章名称", dataIndex: "title" },
	      { title: "发布时间", dataIndex: "time",
	      	render: (txt) => {
	      		return moment(Number(txt)).format('YYYY-MM-DD hh:mm');
	      	}
	      },
	      { title: "随笔类型", dataIndex: "typeId",
	      	render:(txt)=>{
	      		for(let i in dict){
	      			if(txt === Number(dict[i].code)){
	      				return dict[i].name;
	      			}
	      		}
	      	}
	      },
	      { title: "评论个数", dataIndex: "commentNum" },
	      { title: "阅读次数", dataIndex: "readNum" },
	      { title: "是否发布", dataIndex: "isPublish" ,
	      		render: (txt) => {
	      			return Number(txt) === 0 ? '未发布' : '已发布';
	      		}
	      },
	      {
	        title: "操作",
	        dataIndex: "operator",
	        render: (text, record, index) => {
	          return (
	            <div>
	              <span className="view-span" onClick={() => this.viewDetail(record)}>
	                详情
	              </span>
	              <span className="view-span" onClick={() => this.edit(record)}>
	                编辑
	              </span>
	              <span className="view-span" onClick={() => this.checkComment(record)}>
	                查看评论
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
			</div>
		);
	}
}
export default IndexPage;