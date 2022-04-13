const express = require('express')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))

const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => {
  console.log("api server");
})