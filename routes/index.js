'use strict'

const express = require('express')
const productController = require('../controllers/product')
const categoryController = require('../controllers/category')
const authController = require('../controllers/auth')
const router = express.Router()

//router.get('/', productController.listProduct)
router.get('/', productController.listProduct, (req, res) => {
	console.log(req.session.login)
	console.log(req.session.name)
	// res.render('index', {
	// 	login: req.session.login,
	// 	name: req.session.name
	// })
})
router.get('/add', categoryController.listCategory, (req, res) => {
	res.render('add')
})
router.post('/save', productController.saveProduct)
router.get('/edit/:id', productController.listProductForIdEdit)
router.put('/update/:id', productController.updateProduct)
router.get('/show/:id', productController.listProductForIdDelete)
router.delete('/delete/:id', productController.deleteProduct)
router.get('/login', (req, res) => {
	res.render('auth/login')
})
router.post('/signin', authController.login)
router.get('/register', (req, res) => {
	res.render('auth/register')
})
router.post('/signup', authController.register)
router.get('logout', authController.logout)

module.exports = router