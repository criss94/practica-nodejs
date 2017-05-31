'use strict'

const Auth = require('../models/auth')
const bcrypt = require('bcrypt-nodejs')

function generateHash(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function compareHash(passwordForm, passwordHash){
	return bcrypt.compareSync(passwordForm, passwordHash);
}

function register(req, res){
	console.log(req.body)
	let auth = new Auth({
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		password: generateHash(req.body.password)
	})
		auth.save((err) => {
			if(err) return res.end('Error al registrarse o el email ya existe: ' + err)
			res.redirect('/')
		})
}

function login(req, res){
	let email = req.body.email
	
	Auth.findOne({email: email}, (err, user) => {
		if(err) return res.end('Error al loguearse')
		if(!user) {
			return res.render('auth/login',{
				errorLogin: 'Usuario o contraseña incorrecto'
			})
		}

		let passForm = req.body.password
		let passDB = req.user = user.password
		if (compareHash(passForm, passDB)) {
			req.session.user = user
			req.session.login = 1
			req.session.name = user.name
			res.redirect('/')
		}else{
			return res.render('auth/login',{
				errorLogin: 'Usuario o contraseña incorrecto'
			})	
		}
	})
}

function logout(req, res){
	req.session.destroy()
	res.redirect('/')
}

module.exports = {
	register,
	login,
	logout
}