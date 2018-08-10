/**
 * 作者列表页
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
	viewDetail = (item) => {
		this.props.history.push('/material/authorDetail');
	}
	render() {
		const data = [
			{ id:1,t1:1,t2:'李白',t3:'唐',t4:'1000',t5:'1100',t6:'1222',t7:'太白'}
		]
		//表格配置
	    const columnsConfig = [
	      { title: "序号", dataIndex: "t1" },
	      { title: "作者名称", dataIndex: "t2" },
	      { title: "朝代", dataIndex: "t3" },
	      { title: "生于", dataIndex: "t4" },
	      { title: "卒于", dataIndex: "t5" },
	      { title: "寿终", dataIndex: "t6" },
	      { title: "字", dataIndex: "t7" },
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
		        total: 0,
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
				<Breadcrumb data={['素材管理','作者']}/>
				<TableBar config={TableConfig}/>
			</div>
		);
	}
}
export default IndexPage;