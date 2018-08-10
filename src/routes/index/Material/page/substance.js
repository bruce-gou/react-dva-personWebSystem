/**
 * 诗词列表页
 */
import React, { Component } from "react";
//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sty:{}
		};
	}
	componentWillMount(){
	}
	//查看详情
	viewDetail = (item) => {
		this.props.history.push('/material/substanceDetail');
	}
	render() {
		const data = [
			{ id:1,t1:1,t2:'兰亭集序',t3:'张三',t6:'唐',t4:'抒情',t5:'写景'}
		]
		//表格配置
	    const columnsConfig = [
	      { title: "序号", dataIndex: "t1" },
	      { title: "文章名称", dataIndex: "t2" },
	      { title: "作者", dataIndex: "t3" },
	      { title: "朝代", dataIndex: "t6" },
	      { title: "分类", dataIndex: "t4" },
	      { title: "题材", dataIndex: "t5" },
	      {
	        title: "操作",
	        dataIndex: "operator",
	        render: (text, record, index) => {
	          return (
	            <div>
	              <span
	                className="view-span"
	                onClick={() => this.viewDetail(record)}
	              >
	                详情
	              </span>
	              <span
	                className="view-span"
	                onClick={() => this.viewDetail(record)}
	              >
	                译文
	              </span>
	              <span
	                className="view-span"
	                onClick={() => this.viewDetail(record)}
	              >
	                创作背景
	              </span>
	            </div>
	          );
	        }
	      }
	    ];
		const TableConfig = {
		      dataSource: data,
		      columns: columnsConfig,
		      loading: false,
		      pagination: {
		        current: 1,
		        pageSize: 10,
		        total: 10,
		        onChange: this.changePage,
		        showTotal: (total, range) =>
		          `共 ${total} 条  显示  ${range[0]}-${range[1]} 条`,
		        showSizeChanger: true,
		        showQuickJumper: true,
		      },
		      isBordered: true
		    };
		return(
			<div>
				<Breadcrumb data={['素材管理','内容']}/>
				<TableBar config={TableConfig}/>
			</div>
		);
	}
}
export default IndexPage;