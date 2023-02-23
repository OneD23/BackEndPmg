'use strict'

var express = require('express')
var multipart = require('connect-multiparty')
var controlers = require('../Controllers/Usuarios')

var router = express.Router()

var multipartMiddleware = multipart({uploadDir: './uploads'})

router.get('/',controlers.home)
router.get('/save',controlers.save)
router.get('/find/:Id',controlers.Find)
router.get('/list',controlers.List)
router.get('/update/:Id',controlers.Update)
router.delete('/:Id',controlers.Delete)
router.post('/uploadImage/:Id', multipartMiddleware,controlers.Upload)

module.exports = router;