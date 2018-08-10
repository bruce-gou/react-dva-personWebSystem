import request from '@/utils/request';
//获取菜单
export function MenuList(data){
	return request('/menu', data);
}