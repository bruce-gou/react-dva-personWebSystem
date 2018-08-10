//文章
import { routerRedux } from 'dva/router';
import { message } from "antd";
//私有
import { SaveLocal, GetLocal, DelLocal } from '@/utils/tool';

//api
import * as API from '@/services/api';

let params = {}
export default {
	namespace: 'Essay',
	state: {
		loading: false,
		data:[],
		detail:{},
		total:0
	},
	effects: {
		*list({ payload: payload }, { call, put }) {
			params = payload;
			yield put({ type: 'backList', payload: {loading:true}});
			const data =  yield call( API.ArticleList, payload );
			yield put({ type: 'backList', payload: {...data,loading: false}});
		},
		*add({ payload: payload }, { call, put }) {
			const data =  yield call( API.ArticleAdd, payload );
			message.success(data.message);
			yield put(routerRedux.goBack());
		},
		*edit({ payload: payload }, { call, put }) {
			const data =  yield call( API.ArticleEdit, payload );
			message.success(data.message);
			yield put(routerRedux.goBack());
		},
		*detail({ payload: payload }, { call, put }) {
			const data =  yield call( API.ArticleDetail, payload );
			yield put({ type: 'backDetail', payload: {detail: data}});
		},
		*del({ payload: payload }, { call, put }) {
			const data =  yield call( API.ArticleDel, payload );
			message.success(data.message);
			yield put({ type: 'list', payload: params });
		}
	},
	reducers: {
		loading(state, { payload }){
			return { ...state, ...payload };
		},
		//返回数据
		backList(state, { payload }) {
			return { ...state, ...payload};
		},
		//返回数据
		backDetail(state, { payload }) {
			return { ...state, ...payload};
		},
	},
};