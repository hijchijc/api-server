const db = require('../db/index')

exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('用户信息获取失败')

    res.send({
      status: 0,
      message: '用户信息获取成功',
      data: results[0]
    })
  })
}