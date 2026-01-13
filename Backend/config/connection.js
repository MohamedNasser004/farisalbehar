const express = require('express');
const mysql = require('mysql2');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());


const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// ✅ التأكد من الاتصال بقاعدة البيانات
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ خطأ في الاتصال بقاعدة البيانات:", err);
        return;
    }
    console.log("✅ تم الاتصال بقاعدة البيانات بنجاح");
    connection.release(); 
});

module.exports = pool;