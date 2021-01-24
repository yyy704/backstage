const express = require('express');
const app = express();
const path = require('path');

// 引入模块
const router = require('./router-controller/router')

const artTemplate = require('art-template');
const express_template = require('express-art-template');

//配置模板的路径
app.set('views', __dirname, '');
console.log(__dirname);

//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template);

//使用模板引擎扩展名为html
app.set('view engine', 'html');

// 内置中间件托管静态资源
app.use(express.static(path.join(__dirname), ''))


// 获取body参数中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
        extended: true
    })) // for parsing application/x-www-form-urlencoded

app.use(router);

app.listen(3000, () => {
    console.log('6666');
})