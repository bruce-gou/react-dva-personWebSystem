import { routerRedux } from 'dva/router';
import { message } from "antd";
import * as API from '@/services/app/api';
//私有
export default {
	namespace: 'App',
	state: {
		data:[]
	},
	effects: {
		//路由切换
		*routeChange({ payload:value }, { call, put }) {
			yield put(routerRedux.push(value));
		},
		*menu(_, { call, put }) {
			const data =  yield call( API.MenuList);
			yield put({ type: 'backList', payload: { data }});
		}
	},
	reducers: {
		backList(state, { payload }) {
			return {
				...state,
				...payload
			};
		},
	},
	subscriptions: {//订阅 --监听路由
		setup({ history }) {
		// Subscribe history(url) change, trigger `load` action if pathname is `/`
			return history.listen(({ pathname, search }) => {
				if (typeof window.ga !== 'undefined') {
					window.ga('send', 'pageview', pathname + search);
				}
			});
		},
	}
};