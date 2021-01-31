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

// 封装 Promise 获取数据库信息的方法
function dbquery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if (err) { reject(err); }
            // select(查) => data是一个数组[{},{},..]  data.length > 说明有数据
            // insert delete update（增删改） => data是一个对象 data.affectedRows > 0说明成功
            resolve(data)
        })
    })
}

// 暴露方法
module.exports = dbquery;