const express = require('express');

// 得到一个路由
let router = express.Router()


// 引入模块
const controller = require('./controller');


router.get('/abult', controller.abult)

router.get('/index', controller.index)

router.get('/index2', controller.index2)

router.get('/index3', controller.index3)

router.get('/index4', controller.index4)

// 分类管理
// 获取数据库信息
router.post('/data', controller.data)

// 删除数据
router.post('/romet', controller.romet)

// 编辑回显数据
router.get('/bianji', controller.bianji)

// 编辑修改数据
router.post('/xiugai', controller.xiugai)

// 添加数据
router.post('/addtian', controller.addtian)

// 文章管理
// 获取文章数据
router.get('/getarticle', controller.getarticle)


// 暴露路由
module.exports = router;