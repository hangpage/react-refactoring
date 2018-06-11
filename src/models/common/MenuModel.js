import { menuService } from '../../services/app/MenuService'

export default {

  namespace: 'menu',

  state: {
    menus: [],
    mode: 'horizontal',
    theme: 'dark',
    defaultSelectedKeys: ['1'],
    currentMenuItemChildren: []
  },

  subscriptions: {

  },

  effects: {
    *query({payload}, {call, put}) {  // eslint-disable-line
      const {data} = yield call(menuService, payload);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            menus: data.data
          }
        });
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      return {...state, ...action.payload};
    },
    onMenuItemClick(state, action){
      return {...state, ...action.payload};
    }
  },

};
