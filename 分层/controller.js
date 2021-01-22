const mysqlff = require('../mysql/mysql.js');

// 控制器文件

// 文章列表控制器
let controller = {};

// 这里就是控制器  ，可以做一些业务逻辑 ，在m和v起一个调度作用
//1. 接收用户的请求，如接收参数
//2. 渲染模板 res.render()
//3. 调用模型model操作数据库
controller.abult = (req, res) => {
    res.render('./views/houtaibuju.html')
}

controller.index = (req, res) => {
    res.render('./views/houtaibuju copy.html')
}

controller.index2 = (req, res) => {
    res.render('./views/houtaibuju copy 2.html')
}

controller.index3 = (req, res) => {
    res.render('./views/houtaibuju copy 3.html')
}

controller.index4 = (req, res) => {
    res.render('./views/houtaibuju copy 4.html')
}

// 获取数据库信息
controller.data = async(req, res) => {
    // 查询数据库
    let sql = "select * from shuming";
    let rows = await mysqlff(sql)
    res.json(rows)
}

// 删除数据
controller.romet = async(req, res) => {
    // 删除数据库信息
    let {
        id
    } = req.body;
    // 判断参数
    if (!id) {
        res.json({
            errcode: 110,
            msjj: '参数有误'
        })
    } else {
        // 去数据库删除该数据
        let sql = `delete from shuming where id = ${id}`;
        let result = await mysqlff(sql)
        if (result) {
            // 删除成功返回
            res.json({
                errcode: 1,
                msjj: '删除成功'
            })
        } else {
            // 失败返回
            res.json({
                errcode: 2,
                msjj: "服务器繁忙，请稍后再试"
            })
        }
    }
}

// 编辑回显数据
controller.bianji = async(req, res) => {
    let {
        id
    } = req.query;
    // 查询数据库
    let sql = `select * from shuming where id = ${id}`;
    let rows = await mysqlff(sql)
    res.json(rows)
}

// 编辑修改数据
controller.xiugai = async(req, res) => {
    let {
        sj,
        mc,
        id
    } = req.body;
    // 判断参数
    if (!id) {
        res.json({
            errcode: 101,
            msjj: '参数有误'
        });
        return;
    }
    //更改
    var sql = `update shuming set name='${mc}', time='${sj}'  where id=${id}`;
    let result = await mysqlff(sql);
    if (result.affectedRows) {
        res.json({
            errcode: 1,
            msjj: "编辑成功"
        });
    } else {
        res.json({
            errcode: 102,
            msjj: '编辑失败'
        })
    }
}

// 添加数据
controller.addtian = async(req, res) => {
    let {
        mc,
        sj
    } = req.body;
    // 把用户传来的数据传入数据库
    let sql = `insert into shuming(name,time) values('${mc}','${sj}')`;
    let result = await mysqlff(sql);
    if (result.affectedRows) {
        res.json({
            errcode: 1,
            msjj: "添加成功"
        });
    } else {
        res.json({
            errcode: 103,
            msjj: '添加失败'
        })
    }
}

controller.getarticle = async(req, res) => {
    let {
        page,
        limit
    } = req.query;
    // 分页算法
    let offset = (page - 1) * limit;
    let sql = `select * from wengzhang limit ${offset},${limit}`;
    // 获取数据库一共有多少条数据
    let sql2 = `select count(*) as count from wengzhang;`;
    // 用 Promise.all 将串行改为并行
    let rows1 = mysqlff(sql);
    let rows2 = mysqlff(sql2);
    let result = await Promise.all([rows1, rows2]);
    let shuji = result[0];
    let tiaoshu = result[1][0].count;
    // table 组件默认规定的数据格式
    let app = {
        "code": 0,
        "msg": "",
        "count": tiaoshu, // 条数
        "data": shuji // 数据
    }
    res.json(app)
}

// 暴露控制器
module.exports = controller;