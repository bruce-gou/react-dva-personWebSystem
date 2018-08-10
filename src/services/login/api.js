import request from '@/utils/request';
//登录
export function Login(data){
	return request('/login', {body:data, method:'POST'});
}
export function AllDict(data){
	return request('/admin/allDict');
}
