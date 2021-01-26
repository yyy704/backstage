const mysqlff = require('../mysql/mysql.js');
const fs = require('fs');


// 控制器文件

// 文章列表控制器
let controller = {};

// 这里就是控制器  ，可以做一些业务逻辑 ，在m和v起一个调度作用
//1. 接收用户的请求，如接收参数
//2. 渲染模板 res.render()
//3. 调用模型model操作数据库

// 主页面
controller.abult = (req, res) => {
    res.render('./views/houtaibuju.html')
}

// 分类编辑
controller.index = (req, res) => {
    res.render('./views/houtaibuju-Edit-category.html')
}

// 文章管理
controller.index2 = (req, res) => {
    res.render('./views/houtaibuju-Article-management.html')
}

// 分类管理
controller.index3 = (req, res) => {
    res.render('./views/houtaibuju-Classified-management.html')
}

// 添加分类
controller.index4 = (req, res) => {
    res.render('./views/houtaibuju-Add-category.html')
}

// 添加文章
controller.index5 = (req, res) => {
    res.render('./views/houtaibuju-Add-article.html')
}

// 编辑文章
controller.index6 = (req, res) => {
    res.render('./views/houtaibuju-Article-editor.html')
}

// 登录页面
controller.login = (req, res) => {
    res.render('./views/Loginpage.html')
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
        if (result.affectedRows) {
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

// 编辑分类回显数据
controller.bianji = async(req, res) => {
    let {
        id
    } = req.query;
    // 查询数据库
    let sql = `select * from shuming where id = ${id}`;
    let rows = await mysqlff(sql)
    res.json(rows)
}

// 编辑分类修改数据
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

// 添加分类数据
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

// 动态渲染文章页面
controller.getarticle = async(req, res) => {
    let {
        page,
        limit: tmm
    } = req.query;
    // 分页算法
    let offset = (page - 1) * tmm;
    let sql = `select t1.*,t2.name from wengzhang as t1 left join shuming as t2 on t1.classification = t2.id limit ${offset},${tmm}`;
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

// 删除文章数据
controller.articledeletion = async(req, res) => {
    let {
        id,
        cover
    } = req.body;
    let sql = `delete from wengzhang where id = ${id}`;
    let result = await mysqlff(sql);
    if (result.affectedRows) {
        // 删除成功返回
        fs.unlinkSync(cover); // 删除数据随便也删除图片
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
    };
}

// 上传图片
controller.uploadpictures = (req, res) => {
    // 结构赋值
    let {
        originalname,
        destination,
        filename
    } = req.file;
    let jqlength = originalname.lastIndexOf('.'); // 截取的长度
    let suffix = originalname.substring(jqlength); // 截取文件的后缀
    let jiu = `${destination}${filename}`; // 原文件
    let xing = `${destination}${filename}${suffix}`; // 新文件
    // 新用户替换就用户
    fs.rename(jiu, xing, (err) => {
        if (err) throw err;
        res.json({
            errcode: '1',
            msjj: '上传成功',
            luj: xing
        })
    })

}

// 添加文章数据
controller.articleaddition = async(req, res) => {
    let {
        cover,
        title,
        fenlei,
        time,
        status,
        content,
        zhuozhe
    } = req.body;
    // 把用户传来的数据传入数据库
    let sql = `insert into wengzhang(title,content,author,Launchtime,cover,state,classification) values('${title}','${content}','${zhuozhe}','${time}','${cover}','${status}','${fenlei}')`;
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

// 加载分类
controller.loadClassification = async(req, res) => {
    // 查询数据库
    let sql = "select * from shuming";
    let rows = await mysqlff(sql)
    res.json(rows)
}

// 编辑文章回显
controller.articleecho = async(req, res) => {
    let {
        id
    } = req.body;
    // 查询数据库
    let sql = `select * from wengzhang where id=${id}`;
    let rows = await mysqlff(sql);
    res.json(rows || {})
}

// 编辑文章更新数据库\
controller.articleeditor = async(req, res) => {
    let {
        title,
        fenlei,
        time,
        status,
        content,
        id,
        cover,
        jiutu
    } = req.body;
    //更改
    // 判断如果有新图片传过来就加新图片，没有就不加
    if (cover) {
        var sql = `update wengzhang set title='${title}', content='${content}',Launchtime='${time}', cover='${cover}',state='${status}',classification='${fenlei}'  where id=${id}`;
    } else {
        var sql = `update wengzhang set title='${title}', content='${content}',Launchtime='${time}',state='${status}',classification='${fenlei}'  where id=${id}`;
    }
    let result = await mysqlff(sql);
    if (result.affectedRows) {
        // 成功之后，删除就图
        cover && fs.unlinkSync(jiutu);
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

// 页面登录
controller.eelogin = async(req, res) => {
    let {
        username,
        password
    } = req.body;
    console.log(username, password);
    // 查询数据库匹配是否登录成功
    let sql = `select * from zhuozhe where username='${username}' and password='${password}'`;
    let rows = await mysqlff(sql);
    if (rows.length != 0) {
        res.json({
            errcode: 1,
            msjj: "登录成功"
        });
    } else {
        res.json({
            errcode: 102,
            msjj: '登录失败'
        })
    };

}

// 分类表数据可视化
controller.flbiao = async(req, res) => {
    // 链表查询 文章的那些分类 和 条数
    let sql = `select count(*) zhonshu,t2.name  from wengzhang as t1 left join shuming as t2 on t1.classification = t2.id group by t2.id`;
    let jieg = await mysqlff(sql);
    if (jieg.length != 0) {
        res.json(jieg)
    } else {
        res.json({
            errcode: 102,
            msjj: '数据错误'
        })
    }

}


// 暴露控制器
module.exports = controller;