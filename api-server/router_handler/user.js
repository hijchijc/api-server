const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/index')
const config = require('../config')

exports.regUser = (req, res) => {
  const userInfo = req.body
  if(!userInfo.username || !userInfo.password)
    // return res.send({status:1, message:'用户名或密码不合法'})
    return res.cc('用户名或密码不合法')

  const sqlStr = 'select * from ev_users where username=?'

  db.query(sqlStr, userInfo.username, (err, results) => {
    if(err) {
      // return res.send({status: 1, message: err.message})
      return res.cc(err)
    }
    if(results.length > 0) {
      // return res.send({status: 1, message: '用户名已被占用'})
      res.cc('用户名已被占用')
    }

    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    const sql = 'insert into ev_users set ?'
  
    db.query(sql, {username: userInfo.username, password: userInfo.password}, (err, results) => {
      if(err) {
        // return res.send({status: 1, message: err.message})
        return res.cc(err)
      }
      if(results.affectedRows !== 1) {
        // return res.send({status: 1, message: '用户注册失败'})
        return res.cc('用户注册失败')
      }
    })

    res.send({status: 0, message: '注册成功'})
  })
}

exports.login = (req, res) => {
  const userInfo = req.body
  const sqlStr = 'select * from ev_users where username=?'

  db.query(sqlStr, userInfo.username, (err, results) => {
    if(err) {
      // return res.send({status: 1, message: err.message})
      return res.cc(err)
    }
    if(results.length !== 1) {
      // return res.send({status: 1, message: '用户名已被占用'})
      res.cc('登录失败')
    }
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if(!compareResult) return res.cc('登录失败')

    const user = {...results[0], password:'', user_pic:''}
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
    res.send({status: 0, 
      message:'登录成功',
      token: 'Bearer ' + tokenStr
    })
  })
}