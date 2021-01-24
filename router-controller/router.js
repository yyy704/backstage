const express = require('express');
const multer = require('multer');

// 得到一个路由
let router = express.Router()

// 定义上传的目录
var upload = multer({
    dest: 'uploads/'
})


// 引入模块
const controller = require('./controller');

// 主页面
router.get('/abult', controller.abult)
    // 分类编辑
router.get('/index', controller.index)
    // 文章管理
router.get('/index2', controller.index2)
    // 分类管理
router.get('/index3', controller.index3)
    // 添加分类
router.get('/index4', controller.index4)
    // 添加文章
router.get('/index5', controller.index5)
    // 编辑文章
router.get('/index6', controller.index6)

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

// 删除文章数据
router.post('/articledeletion', controller.articledeletion)

// 上传文件
router.post('/uploadpictures', upload.single('file'), controller.uploadpictures)

// 添加文章数据
router.post('/articleaddition', controller.articleaddition)

// 加载分类
router.get('/loadClassification', controller.loadClassification);

// 编辑文章回显
router.post('/articleecho', controller.articleecho)

// 编辑文章更新数据库
router.post('/articleeditor', controller.articleeditor)

// 暴露路由
module.exports = router;