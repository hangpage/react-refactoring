import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import './cover.css';
import createLoading from 'dva-loading';

import createHistory from 'history/createBrowserHistory';
const history = createHistory({
  basename:''//这里放入你对应的 basename
});


// 1. Initialize

//暂时使用browseHistory hash一直warning很烦
//之前刷新报错的解决方案可查看README.MD
const app = dva({
  history: history
});

// const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
/*
*  一定要把model注入要app中！！！ +2
*  已经两次忘记注入导致浪费十分钟以上！！
* */
app.model(require('./models/user/UserModel.js').default);
app.model(require('./models/login/LoginModal.js').default);
app.model(require('./models/common/app.js').default);
app.model(require('./models/cash/UncashModel').default);
app.model(require('./models/cash/SettleModel').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
