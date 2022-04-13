const mysql = require('mysql')

const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password: 'admin',
  database: 'my_db_01'
})

db.query('select 1', (err, results) => {
  if(err) return console.log(err.message);
  console.log(results);
})

const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  if(err) return console.log(err.message);
  console.log(results);
})

// const user = {username: 'spideman', password: 'qwer'}

// const sqlStr2 = 'insert into users(username, password) values(?, ?)'

// db.query(sqlStr2, [user.username, user.password], (err, results) => {
//   if(err) return console.log(err.message);
//   if(results.affectedRows === 1)
//    console.log('success');
// })

// const user2 = {username: 'spideman2', password: 'qwer1'}

// const sqlStr3 = 'insert into users set ?'

// db.query(sqlStr3, user2, (err, results) => {
//   if(err) return console.log(err.message);
//   if(results.affectedRows === 1)
//    console.log('success');
// })

const user3 = {id:3, username: 'aaaa', password:'poiu'}

const sqlStr4 = 'update users set ? where id=?'

db.query(sqlStr4, [user3, user3.id], (err, results) => {
  if(err) return console.log(err.message);
  if(results.affectedRows === 1)
   console.log('success');
})

