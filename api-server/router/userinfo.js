const express = require('express')
const router = express.Router()

const user_handler = require('../router_handler/userinfo')

router.get('/userinfo', user_handler.getUserInfo)



module.exports = router