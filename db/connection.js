
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL passworrd
        password: 'Boss',
        database: 'jtech_employees'
    },
    console.log('Connected to the jtech_employees database.')
);

module.exports = db;