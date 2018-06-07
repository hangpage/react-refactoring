/**
 * @param
 * @author zhu <zzhihang@hotmail.com> 2018/6/7 15:16
 * @description：全局model,包括tab panes
 *
 */

import UserPage from '../../routes/user'



export default {

  namespace: 'app',

  state: {
    newTabIndex: 0,
    panes: [
      { title: '首页', content: <UserPage />, key: '1', closable: false },
    ],
    activeKey: '1'
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    addTab(state, action){
      const panes = state.panes;
      const activeKey = action.payload.key || `newTab${state.newTabIndex++}`;
      panes.push({ title: action.payload.title || '新页签', content: action.payload.content || '新标签', key: activeKey });
      return { ...state, activeKey: activeKey, panes: panes};
    },
    changeTab(state, action){
        return { ...state, activeKey: action.payload.targetKey }
    },
    removeTab(state, action){
        let activeKey = state.activeKey;
        let lastIndex;
        state.panes.forEach((pane, i) => {
          if (pane.key === action.payload.targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = state.panes.filter(pane => pane.key !== action.payload.targetKey);
        if (lastIndex >= 0 && activeKey === action.payload.targetKey) {
          activeKey = panes[lastIndex].key;
        }
        return {...state, activeKey: activeKey, panes: panes }
    }
  },

};
