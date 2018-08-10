import { routerRedux } from 'dva/router';
import { message } from "antd";
//私有
import { SaveLocal, GetToken, DelLocal, Tips } from '@/utils/tool';
//api
import * as API from '@/services/login/api';

export default {
  namespace: 'Login',
  state: {
    loading: false,
  },
   effects: {
    *login({ payload: payload }, { call, put }) {
		yield put({type: "save", payload: {loading:true}});
		const data =  yield call( API.Login, payload );
		Tips(data);
		if(!data.error){
			SaveLocal('token',data.data);
			yield put({type: "allDict"});
			yield put(routerRedux.push('/'));
		}
		yield put({type: "save", payload: {loading:false}});
    },
    //退出登录
    *logout(_, { call, put }) {
    		DelLocal('token');
    		DelLocal('menu');
    		DelLocal('dict');
    		yield put(routerRedux.push('/login'));
    },
    //检查登录
    *checkLogin(_, { call, put }) {
    		const data = GetToken();
    		if(!data){
    			yield put(routerRedux.push('/login'));
    		}
    },
    //获取所有字典
    *allDict(_,{ call, put}){
    		const data =  yield call( API.AllDict );
    		SaveLocal('dict',JSON.stringify(data));
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
      	 ...state,
      	...payload
      };
    },
  },
};