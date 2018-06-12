import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import './cover.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
/*
*  一定要把model注入要app中！！！ +2
*  已经两次忘记注入导致浪费十分钟以上！！
*  之后找一个可以自动注入的插件 今天在知乎看到了
* */
app.model(require('./models/user/UserModel.js').default);
app.model(require('./models/login/LoginModal.js').default);
app.model(require('./models/common/app.js').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
