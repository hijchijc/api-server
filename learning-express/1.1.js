const express = require('express')

const router = express.Router()

router.get('/user/list', (req, res) => {
  res.send('userList')
})

router.get('/user/add', (req, res) => {
  res.send('userAdd')
})

module.exports = router