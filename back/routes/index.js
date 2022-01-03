const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  res.send('Козлов Александр 191-361')
})

module.exports = router
