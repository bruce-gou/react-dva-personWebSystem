import request from '@/utils/request';
//随笔
export function ArticleList(data){
	return request('/admin/article/list', data);
}
export function ArticleAdd(data){
	return request('/admin/article/add', {body:data, method:'POST'});
}
export function ArticleEdit(data){
	return request('/admin/article/edit', {body:data, method:'POST'});
}
export function ArticleDetail(data){
	return request('/admin/article/detail', data);
}
export function ArticleDel(data){
	return request('/admin/article/del', data);
}
//评论
export function SpeechList(data){
	return request('/admin/speech/list', data);
}
export function SpeechAssess(data){
	return request('/admin/speech/assess', {body:data, method:'POST'});
}
export function SpeechDel(data){
	return request('/admin/speech/del', data);
}
//资源
export function ResourcesList(data){
	return request('/admin/resources/list', data);
}
export function ResourcesAdd(data){
	return request('/admin/resources/add', {body:data, method:'POST'});
}
export function ResourcesEdit(data){
	return request('/admin/resources/edit', {body:data, method:'POST'});
}
export function ResourcesDel(data){
	return request('/admin/resources/del', data);
}