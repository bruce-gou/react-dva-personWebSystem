//数据字典
import { routerRedux } from 'dva/router';
import { message } from "antd";

import { Tips } from '@/utils/tool.js';
//api
import * as API from '@/services/sys/api';

let params = {}
export default {
	namespace: 'Dict',
	state: {
		loading: false,
		data:[],
		typeData:[],
		total:0
	},
	effects: {
		//类型列表
		*typeList({ payload: payload }, { call, put }) {
			const data =  yield call( API.DictTypeList );
			yield put({ type: 'backList', payload:{ typeData: data }});
		},
		//字典列表
		*list({ payload: payload }, { call, put }) {
			params = payload;
			yield put({ type: 'backList', payload: {...data,loading: true}});
			const data =  yield call( API.DictList, payload );
			yield put({ type: 'backList', payload: { data, loading: false}});
		},
		*typeAdd({ payload: payload }, { call, put }) {
			const data =  yield call( API.DictTypeAdd, payload );
			Tips(data);
			yield put({ type: 'typeList'});
		},
		*add({ payload: payload }, { call, put }) {
			const data =  yield call( API.DictAdd, payload );
			Tips(data);
			if(!data.error){
				yield put({ type: 'list', payload: params});
			}
		},
		*typeDel({ payload: payload }, { call, put }) {
			const data =  yield call( API.DictTypeDel, payload );
			Tips(data);
			yield put({ type: 'typeList' });
			yield put({ type: 'list', payload: params});
		},
		*del({ payload: payload }, { call, put }) {
			const data =  yield call( API.DictDel, payload );
			Tips(data);
			yield put({ type: 'list', payload: params });
		},
		*edit({ payload: payload }, { call, put }) {
			const data =  yield call( API.DictEdit, payload );
			Tips(data);
			yield put({ type: 'list', payload: params});
		}
	},
	reducers: {
		//返回数据
		backList(state, { payload }) {
			return { ...state, ...payload};
		}
	}
};