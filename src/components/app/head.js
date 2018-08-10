/**
 * 头部
 */
import React, { Component } from "react";
import { Layout, Icon, Dropdown, Menu, Avatar } from 'antd';
//资源
import  headIcon  from '@/assets/headIcon.png';

const { Header } = Layout;
class IndexPage extends Component {
	render() {
		const { collapsed, toggle, headNavClick, styles, userInfo } = this.props;
		const menu = (
	      <Menu className={styles.userNav}  onClick={headNavClick}>
	        <Menu.Item disabled>
	          <Icon type="user" />个人中心
	        </Menu.Item>
	        <Menu.Item disabled>
	          <Icon type="setting" />设置
	        </Menu.Item>
	        <Menu.Item key="triggerError">
	          <Icon type="close-circle" />触发报错
	        </Menu.Item>
	        <Menu.Divider />
	        <Menu.Item key="logout">
	          <Icon type="logout" />退出登录
	        </Menu.Item>
	      </Menu>
	    );
		return(
			<Header className={styles.head}>
	            <Icon
	              className={styles.trigger}
	              type={collapsed ? 'menu-unfold' : 'menu-fold'}
	              onClick={toggle}
	            />
	            <div className={styles.head_right}>
					<Dropdown overlay={menu} className={styles.head_right_list}>
						<span>
			                <Avatar size="small" src={headIcon} className={styles.headIcon} />
			                	<span>{userInfo.name}</span>
			        		</span>
					</Dropdown>
	            </div>
          	</Header>
		);
	}
}
export default IndexPage;