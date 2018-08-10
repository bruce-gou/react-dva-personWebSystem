//权限
import { routerRedux } from 'dva/router';
import { message } from "antd";

import { Tips } from '@/utils/tool.js';
//api
import * as API from '@/services/sys/api';
let params = {}
export default {
	namespace: 'Power',
	state: {
		loading: false,
		data:[],
		total:0
	},
	effects: {
		//列表
		*list({payload: payload}, { call, put }) {
			params = payload
			yield put({ type: 'backList', payload: {loading: true}});
			const data =  yield call( API.PowerList, payload);
			yield put({ type: 'backList', payload: { data, loading: false}});
		},
		*edit({ payload: payload }, { call, put }) {
			const data =  yield call( API.PowerEdit, payload );
			Tips(data);
			yield put({ type: 'list', payload: params });
		}
	},
	reducers: {
		//返回数据
		backList(state, { payload }) {
			return { ...state, ...payload};
		}
	}
};