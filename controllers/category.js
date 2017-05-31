'use strict'

const mongoose = require('mongoose')
const Category = require('../models/category')

function listCategory(req, res){
	Category.find({}, (err, categories) => {
		if(err) return res.end('Hubo un error al listar las categorias')
		if(!categories) return res.end('No hay categorias disponibles')
		res.render('add', {
			title: 'NEW PRODUCT',
			cat: categories
		})
	})
}

module.exports = {
	listCategory
}