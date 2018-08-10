/**
 * 主体架构
 */
import React, { Component } from "react";
import { connect } from 'dva';
import { Layout, Icon } from 'antd';
import { Buffer } from 'buffer';
import { GetToken } from '@/utils/tool';
//组件
import Head from '@/components/app/head';
import Nav from '@/components/app/nav';
//资源
import styles from './style.less';
import Logo from '@/assets/logo.svg';
import navData,{formatter} from '@/common/menu.js';


const { Header, Sider, Content } = Layout;
@connect(({ Login, App }) => ({ $login: Login, $data: App }))
class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			sty:{},
			userInfo:{}
		};
	}
	componentWillMount(){
		this.setPageWH();
		//检查是否登录
		this.props.dispatch({type: 'Login/checkLogin'});
		this.props.dispatch({type:'App/menu'});//获取菜单
		window.addEventListener('resize', this.setPageWH);
	}
	componentDidMount(){
		this.analyzeToken();
	}
	//注销
	componentWillUnmount(){
		window.removeEventListener("resize", this.setPageWH);
	}
	//解析token
	analyzeToken = () => {
		try{
			let token = GetToken();
			token = token.split('.')[0];
			let buff = new Buffer(token,'base64');
			let user = JSON.parse(buff.toString());
			this.setState({
				userInfo: user
			})
		}catch(e){
			//检查是否登录
			this.props.dispatch({type: 'Login/checkLogin'});
		}
	}
	//设置页面宽高
	setPageWH = () => {
		const width = document.body.clientWidth;
		const height = document.body.clientHeight;
		this.setState({
			sty:{
				width: `${width}px`,
				height:`${height}px`,
			}
		})
	}
	//菜单隐藏/显示切换方法
	toggle = () => {
	    this.setState({  collapsed: !this.state.collapsed });
	}
	//头部菜单点击
	headNavClick = (item) => {
		switch (item.key){
			case 'logout'://退出登录
				this.props.dispatch({type: 'Login/logout'});
				break;
			default:
				break;
		}
	}
	//左侧菜单点击切换
	letNavClick = (item) => {
		const path = window.location.href;
		if(path.indexOf(item.key) >= 0){
			return;
		}
		this.props.dispatch({type: 'App/routeChange',payload: item.key});
	}
	render() {
		const { collapsed, sty, userInfo } = this.state;
		let menuList = this.props.$data.data;
		menuList	= menuList.length > 0 ? formatter(menuList) : [];
		return(
			<Layout id={styles.wrapper} style={{...sty}}>
				<Sider 
					trigger={null}
					collapsed={collapsed}
					collapsible
					width="256px"
					>
					<div className={styles.logo}>
						<a>
							<img src={Logo}/>
							<h1>Ant Design Pro</h1>
						</a>
					</div>
					<Nav data={menuList} letNavClick={this.letNavClick} styles={styles}/>
        			</Sider>
	        		<Layout>
	        			<Head toggle={this.toggle} collapsed={collapsed} userInfo={userInfo} headNavClick={this.headNavClick} styles={styles}/>
					<Content id={styles.content}>
						{ this.props.children }
					</Content>
				</Layout>
      		</Layout>
		);
	}
}
export default IndexPage;