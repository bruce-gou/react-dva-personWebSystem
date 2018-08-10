//资源
import { routerRedux } from 'dva/router';
import { message } from "antd";
//api
import * as API from '@/services/api';

let params = {}
export default {
	namespace: 'Resources',
	state: {
		loading: false,
		data:[],
		total:0
	},
	effects: {
		*list({ payload: payload }, { call, put }) {
			params = payload;
			yield put({ type: 'backList', payload: {loading:true}});
			const data =  yield call( API.ResourcesList, payload );
			yield put({ type: 'backList', payload: {...data,loading: false}});
		},
		*add({ payload: payload }, { call, put }) {
			const data =  yield call( API.ResourcesAdd, payload );
			message.success(data.message);
			yield put({ type: 'list', payload: params});
		},
		*edit({ payload: payload }, { call, put }) {
			const data =  yield call( API.ResourcesEdit, payload );
			message.success(data.message);
			yield put({ type: 'list', payload: params});
		},
		*del({ payload: payload }, { call, put }) {
			const data =  yield call( API.ResourcesDel, payload );
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
		}
	}
};