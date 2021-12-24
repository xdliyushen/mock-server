const fs = require('fs');
const path = require('path');
const bodyParse = require('koa-bodyparser');
var cors = require('koa-cors')
const Koa = require('koa');

const app = new Koa();

// 解析参数
app.use(bodyParse());
// 解决跨域问题
app.use(cors({
    origin: (ctx) => ctx.header.origin,
    credentials: true,
}));

// 路由
const routerDir = path.join(__dirname, './router');
const fileList = fs.readdirSync(routerDir);

// 动态加载路由
for (const fileName of fileList) {
    const { default: router } = require(path.join(routerDir, fileName));
    app.use(router.routes());
}

const port = 8000;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});