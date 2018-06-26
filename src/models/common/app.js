/**
 * @param
 * @author zhu <zzhihang@hotmail.com> 2018/6/7 15:16
 * @description：全局model,包括tab panes
 *
 */
import _ from 'lodash';
import { menuService } from '../../services/app/MenuService';
import { arrayToTree } from "../../utils";
import LybCalendar from "../../routes/indexpage/index";


export default {

  namespace: 'app',

  state: {
    newTabIndex: 0,
    panes: [
      { title: '首页', content: <LybCalendar />, key: '1', closable: false },
    ],
    activeKey: '1',
    menus: [],
    menuTreeData: [],
    mode: 'horizontal',
    theme: 'dark',
    defaultSelectedKeys: ['1'],
    currentMenuItemChildren: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'query'
      })
    },
  },

  effects: {
    *query({payload}, {call, put}) {  // eslint-disable-line
      const {data} = yield call(menuService, payload);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            menus: data.data,
          }
        });
      }
    },
  },

  reducers: {
    addTab(state, action){
      const panes = state.panes;
      const activeKey = action.payload.key || `newTab${state.newTabIndex++}`;
      panes.push({ title: action.payload.title || '新页签', content: action.payload.content || action.payload.title, key: activeKey });
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
    },
    querySuccess(state, action) {
      const menuTreeData = arrayToTree(action.payload.menus.filter(_ => _.resourceType !== 'b'), 'id', 'parentId');
      const currentMenuItemChildren = menuTreeData[0].children || [];
      return {...state, ...action.payload, menuTreeData: menuTreeData, currentMenuItemChildren: currentMenuItemChildren};
    },
    onMenuItemClick(state, action){
      return {...state, ...action.payload};
    },
  },

};
