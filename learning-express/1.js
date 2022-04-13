const express = require('express')

const app = express()

const userRouter = require('./1.1')

app.listen(80, () => {
  console.log('visited');
})

app.use(userRouter)

app.use(express.json())

app.get('/user', (req,res) => {
  res.send({name: 'zs', age: 20})
})

app.post('/user', (req,res) => {
  console.log(req.body);
  res.send('success')
})

app.get('/', (req, res) => {
  console.log(req.query);
  res.send(req.query)
})

app.get('/user/:id', (req, res) => {
  console.log(req.params);
  res.send(req.params)
})



// const http = require('http')

// const server = http.createServer()

// server.on('request', (req, res) => {
//   console.log('111');
// })

// server.listen(8080, () => {
//   console.log('server');
// })