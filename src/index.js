import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
/*
*  一定要把model注入要app中！！！
* */
app.model(require('./models/user/user.js').default);
app.model(require('./models/login/login.js').default);

// 4. Router
app.router(require('./router').default);


console.log(app)
// 5. Start
app.start('#root');
