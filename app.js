const express = require ('express');
const app = express();
const mysql = require('mysql2/promise');

app.use(express.json());

//database connection settings
const dbHost = 'localhost';
const dbUser = 'your_username';
const dbpassword = 'your_password';
const dbName = 'your_database_name';

//create a database connection pool
const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    pasword: dbpassword,
    database: dbName,
});

//start server 
app.listen(208, () => {console.log('server started on port 280');
});