/**
 * 数据字典
 */
import React, { Component } from "react";
import {  Row, Col, Modal, Checkbox } from "antd";
import { connect } from 'dva';
import { getDict } from "@/utils/tool";

//引入组件
import Breadcrumb from '@/components/base/breadcrumb.js';
import TableBar from '@/components/base/TableBar.js';


const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
@connect(({ Power }) => ({ $data: Power }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selects:[0],
			data:[{id:0,name:'素材管理内容',pemethods:['查询','修改'],remethods:['查询','修改','删除','新增']}]
		};
	}
	componentWillMount(){
	}
	//点击行之后的回调操作
	RowClickCback = (id) =>{
		const { selects } = this.state;
	  	if(selects[0] == id){
	  		return;
	  	}
	  	this.setState({
	  		selects: [id]
	  	});
	  	this.props.dispatch({type:'Power/list', payload: {id: id} });
	}
	//操作
	html = (txt,item) => {
		let arr = [];
		const menuPower = getDict('菜单权限');
		for(let i in txt){
			for(let j in menuPower){
				if(txt[i] === menuPower[j].code){
					arr.push(menuPower[j].name);
				}
			}
		}
		return <CheckboxGroup options={arr} value={item.power} onChange={(e)=>this.powerChange(e,item)}/>
	}
	//权限修改
	powerChange = (val,item) => {
		const { selects } = this.state;
		this.props.dispatch({type:'Power/edit', payload: { power: val, menuId: item.id, menuName:item.name, userTypeId: selects[0] }});
	}
	render() {
		const { selects, visible, visibleDict, title } = this.state;
		const { data, loading } = this.props.$data;
		//表格配置
	    const roleTableColumn = [
	    		 { title: "用户角色", dataIndex: "name", onCellClick: this.roleOnRowClick }
	    ]
	    const resouTableColumn = [
			{ title: "资源名称", dataIndex: "name", width: "20%" },
			{ title: "已分配权限", dataIndex: "power", width: "30%",
				render: (txt)=> txt && txt.join(',')},
			{ title: "所有权限", dataIndex: "allPower", width: "50%", render: this.html}
		];
	    //类型
	    const roleTable = {
	      dataSource: getDict('用户角色'),
	      columns: roleTableColumn,
	      loading: false,
	      pagination:false,
	      isBordered: true,
	      scroll:{y:600},
	      onRow:(record)=>({
	      	onClick:()=>this.RowClickCback(record.id)
	      }),
	      rowSelection:{
	      	type:'radio',
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
				<Breadcrumb data={['系统管理','权限管理']}/>
				<Row>
					<Col span={6} className="roleTable">
		        			 <TableBar config={roleTable} />
		        		</Col>
		        		<Col span={17} style={{marginLeft:'20px'}}>
		        			 <TableBar config={resouTable} />
		        		</Col>
	        		</Row>
			</div>
		);
	}
}
export default IndexPage;