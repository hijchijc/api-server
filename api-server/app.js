const express = require('express')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))

// 定义简单的返回错误函数
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status, 
      message:err instanceof Error ? err.message : err
    })
  }
  next()
})

// 导入并使用解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret: config.jwtSecretKey, algorithms:['HS256']}).unless({path:[/^\/api/]}))

// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 错误级别中间件
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  res.cc(err)
})

app.listen(3007, () => {
  console.log("api server is running ai http://127.0.0.1:3007");
})