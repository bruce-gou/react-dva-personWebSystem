//用户
import { routerRedux } from 'dva/router';
import { message } from "antd";

import { Tips } from '@/utils/tool.js';
//api
import * as API from '@/services/sys/api';

let params = {}
export default {
	namespace: 'User',
	state: {
		loading: false,
		data:[],
		total:0
	},
	effects: {
		//列表
		*list({ payload: payload }, { call, put }) {
			params = payload;
			yield put({ type: 'backList', payload: {...data,loading: true}});
			const data =  yield call( API.UserList, payload );
			yield put({ type: 'backList', payload: { ...data, loading: false}});
		},
		*add({ payload: payload }, { call, put }) {
			const data =  yield call( API.UserAdd, payload );
			Tips(data);
			if(!data.error){
				yield put({ type: 'list', payload: params});
			}
		},
		*del({ payload: payload }, { call, put }) {
			const data =  yield call( API.UserDel, payload );
			Tips(data);
			yield put({ type: 'list', payload: params });
		},
		*edit({ payload: payload }, { call, put }) {
			const data =  yield call( API.UserEdit, payload );
			Tips(data);
			yield put({ type: 'list', payload: params});
		},
		*editPwd({ payload: payload }, { call, put }) {
			const data =  yield call( API.UserEditPwd, payload );
			Tips(data);
		},
	},
	reducers: {
		//返回数据
		backList(state, { payload }) {
			return { ...state, ...payload};
		}
	}
};