/**
 * 
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-28 15:42:01
 * @version $Id$
 */


export default {
  namespace: 'indexapp',
  state: {
  	values:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateState (state, { payload }) {
 
      return {
        ...state,
        ...payload,
      }
    },
  },

};
