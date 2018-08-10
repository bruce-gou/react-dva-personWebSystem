//数据字典
import { routerRedux } from 'dva/router';
import { message } from "antd";

import { Tips } from '@/utils/tool.js';
//api
import * as API from '@/services/sys/api';

export default {
	namespace: 'Menu',
	state: {
		loading: false,
		data:[],
		total:0
	},
	effects: {
		//列表
		*list(_, { call, put }) {
			yield put({ type: 'backList', payload: {loading: true}});
			const data =  yield call( API.MenuList);
			yield put({ type: 'backList', payload: { data, loading: false}});
		},
		*add({ payload: payload }, { call, put }) {
			const data =  yield call( API.MenuAdd, payload );
			Tips(data);
			if(!data.error){
				yield put({ type: 'list'});
			}
		},
		*del({ payload: payload }, { call, put }) {
			const data =  yield call( API.MenuDel, payload );
			Tips(data);
			yield put({ type: 'list'});
		},
		*edit({ payload: payload }, { call, put }) {
			const data =  yield call( API.MenuEdit, payload );
			Tips(data);
			yield put({ type: 'list'});
		},
		*menuEnable({ payload: payload }, { call, put }) {
			const data =  yield call( API.MenuEnable, payload );
			Tips(data);
			yield put({ type: 'list'});
		}
	},
	reducers: {
		//返回数据
		backList(state, { payload }) {
			return { ...state, ...payload};
		}
	}
};