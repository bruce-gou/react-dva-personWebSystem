import { message } from "antd";
import store from '@/index.js';
//接口操作提示消息
export const Tips = (data) => {
	if(data.error){
		message.error(data.message);
	}else{
		message.success(data.message);
	}
}
//获取字典
export const getDict = (str) => {
	let dict =  sessionStorage.getItem('dict');
	try{
		dict = JSON.parse(dict);
		if(str){
			for(let i in dict){
				if(str === dict[i].name){
					return dict[i].data;
				}
			}
		}else{
			return dict;
		}
	}catch(e){
		message.warning('未获取到数据字典，请退出系统，重新登录！');
		return [];
	}
}
//本地存储
export const SaveLocal = (name, val) => {
	let data = val;
	if(data instanceof Object){
		data = JSON.stringify(data);
	}
	sessionStorage.setItem(name, data);
}
//获取本地存储
export const GetLocal = (name) => {
	return sessionStorage.getItem(name);
}
//删除本地存储
export const DelLocal = (name) => {
	sessionStorage.removeItem(name);
}
//获取token 
export const GetToken = () => {
	const  token =  sessionStorage.getItem('token');
//	if(!token){
//		const { dispatch } = store;
//		store.dispatch({type: 'Login/logout'});
//	}
	return token;
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export function isUrl(path) {
  return reg.test(path);
}