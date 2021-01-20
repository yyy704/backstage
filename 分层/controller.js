const mysql = require('mysql');

// 连接数据库
var connection = mysql.createConnection({
    host: 'localhost', // 主机
    port: '3306', // 端口 
    user: 'root', // 用户名
    password: 'root', // 密码
    database: 'w520' // 数据库
});

// 连接mysql
connection.connect(function(err) {
    if (err) {
        throw err;
    };
    console.log('connect mysql success');
});


// 控制器文件

// 文章列表控制器
let controller = {};

// 这里就是控制器  ，可以做一些业务逻辑 ，在m和v起一个调度作用
//1. 接收用户的请求，如接收参数
//2. 渲染模板 res.render()
//3. 调用模型model操作数据库
controller.abult = (req, res) => {
    res.render('houtaibuju.html')
}

controller.index = (req, res) => {
    res.render('houtaibuju copy.html')
}

controller.index2 = (req, res) => {
    res.render('houtaibuju copy 2.html')
}

controller.index3 = (req, res) => {
    res.render('houtaibuju copy 3.html')
}

controller.index4 = (req, res) => {
    res.render('houtaibuju copy 4.html')
}

// 获取数据库信息
controller.data = (req, res) => {
    // 查询数据库
    let sql = "select * from shuming";
    connection.query(sql, (err, rows) => {
        if (err) {
            throw err;
        };
        res.json(rows)
    })
}

// 删除数据
controller.romet = (req, res) => {
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
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
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
        })
    }
}

// 编辑回显数据
controller.bianji = (req, res) => {
    let {
        id
    } = req.query;
    // 查询数据库
    let sql = `select * from shuming where id = ${id}`;
    connection.query(sql, (err, rows) => {
        if (err) {
            throw err;
        };
        res.json(rows)
    })
}

// 编辑修改数据
controller.xiugai = (req, res) => {
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
    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
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
    })
}

// 添加数据
controller.addtian = (req, res) => {
    let { mc, sj } = req.body;
    // 把用户传来的数据传入数据库
    let sql = `insert into shuming(name,time) values('${mc}','${sj}')`;
    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
        };
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
    })
}

// 暴露控制器
module.exports = controller;