'use strict'

const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')

mongoose.Promise = global.Promise
mongoose.connect(config.db, (err) => {
	if(err) return console.log('Error en la conexion')
		console.log('Conexion exitosa a la DB')
	app.listen(config.port, (err) => {
		if(err) return console.log('Error en en el puerto 3000')
			console.log('Conectado al puerto 3000')
	})
})