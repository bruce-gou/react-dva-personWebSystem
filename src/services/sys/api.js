import request from '@/utils/request';
//字典
export function DictList(data){
	return request('/admin/dict/list', data);
}
export function DictTypeList(data){
	return request('/admin/dict/typeList', data);
}
export function DictAdd(data){
	return request('/admin/dict/add', {body:data, method:'POST'});
}
export function DictTypeAdd(data){
	return request('/admin/dict/addType', {body:data, method:'POST'});
}
export function DictEdit(data){
	return request('/admin/dict/edit', {body:data, method:'POST'});
}
export function DictDel(data){
	return request('/admin/dict/del', data);
}
export function DictTypeDel(data){
	return request('/admin/dict/delType', data);
}

//用户
export function UserList(data){
	return request('/admin/user/list', data);
}
export function UserAdd(data){
	return request('/admin/user/add', {body:data, method:'POST'});
}
export function UserDel(data){
	return request('/admin/user/del', data);
}
export function UserEdit(data){
	return request('/admin/user/edit', {body:data, method:'POST'});
}
export function UserEditPwd(data){
	return request('/admin/user/editPwd', {body:data, method:'POST'});
}
//菜单
export function MenuList(data){
	return request('/admin/menu/list', data);
}
export function MenuAdd(data){
	return request('/admin/menu/add', {body:data, method:'POST'});
}
export function MenuDel(data){
	return request('/admin/menu/del', data);
}
export function MenuEdit(data){
	return request('/admin/menu/edit', {body:data, method:'POST'});
}
export function MenuEnable(data){
	return request('/admin/menu/enable', data);
}

//权限
export function PowerList(data){
	return request('/admin/power/list', data);
}
export function PowerEdit(data){
	return request('/admin/power/edit', {body:data, method:'POST'});
}