const express = require('express');
const mysql = require('mysql');
const app = express();
const http = require('http');

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || '16.170.219.48',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'root',
	database: process.env.MYSQL_DATABASE || 'students'
});

app.get('/', (req, res) => {
	res.send('Hello world')
   })

app.get('/db', (req, res) => {
	connection.query('SELECT * FROM Student' , (err, rows) => {
		if(err){
			res.json({
				success: false,
				err
				});
		}
		else{
			res.json({
				success: true,
				rows
				});
		}
	});
});

app.listen(5000, () => console.log('listining on port 5000'));
