import {
  dropHospitalsService,
  menuService,
  queryLoginUserService,
  switchStoreService
} from '../../services/app/MenuService';
import { arrayToTree } from "../../utils";


export default {

  namespace: 'app',

  state: {
    newTabIndex: 0,
    panes: [],
    activeKey: '1',
    menus: [],
    menuTreeData: [],
    mode: 'horizontal',
    theme: 'light',
    defaultSelectedKeys: ['1'],
    currentMenuItemChildren: [],
    dropHospitalsList: [],
    userInfo: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'query'
      });
      dispatch({
        type: 'queryDropHospitalsList'
      });
      dispatch({
        type: 'queryLoginUser'
      });
    },
  },

  effects: {
    *query({payload}, {call, put}) {
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
    *queryDropHospitalsList({payload}, {call, put}){
      const {data} = yield call(dropHospitalsService, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            dropHospitalsList: data.data,
          }
        });
      }
    },
    *queryLoginUser({payload}, {call, put}){
      const {data} = yield call(queryLoginUserService);
      if(data.success){
        yield put({
          type: 'updateState',
          payload: {
            userInfo: data.data
          }
        })
      }
;    },
    *switchStore({payload}, {call, put}){
      const {data} = yield call(switchStoreService, payload.hospitalId);
      if (data.success) {
        window.location.reload();
      }
    }
  },

  reducers: {
    updateState(state, action){
      return {...state, ...action.payload};
    },
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
    changeTheme(state, action){
      return {...state, ...action.payload};
    }
  },
};
