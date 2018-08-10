import dva from 'dva';
// 1. Initialize
const app = dva();

app.model(require('@/models/login/login.js').default);
app.model(require('@/models/app/index.js').default);

//index


app.model(require('@/models/index/essay.js').default);
app.model(require('@/models/index/speech.js').default);
app.model(require('@/models/index/resources.js').default);


//sys
app.model(require('@/models/sys/dict.js').default);
app.model(require('@/models/sys/user.js').default);
app.model(require('@/models/sys/menu.js').default);
app.model(require('@/models/sys/power.js').default);

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store;
