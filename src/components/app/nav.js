/**
 * 菜单
 */
import React, { Component } from "react";
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys:[]
		};
	}
	onOpenChange = (openKeys) => {
		if(openKeys.length > 1){
			openKeys = openKeys[openKeys.length - 1]
		}
		this.setState({
			openKeys:openKeys
		})
	}
	render() {
		const { openKeys } = this.state;
		const { data, letNavClick, styles } = this.props;
		const htmlInfo = (data) => {
			return	data.map((item,i)=>{
					if(item.children && item.children.length > 0){//父级
						return (<SubMenu key={i} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
								{htmlInfo(item.children)}
							</SubMenu>)
					}else{//子集
						return (<Menu.Item key={item.path}>
								<Icon type={item.icon} />
								<span>{item.name}</span>
							</Menu.Item>)
					}
				}
			)
		}
		return(
			<Menu theme="dark" mode="inline" openKeys={[`${openKeys}`]} onOpenChange={this.onOpenChange} onClick={letNavClick}>
				{ htmlInfo(data) }
  			</Menu>
		);
	}
}
export default IndexPage;