'use strict'

const Product = require('../models/product')
const Category = require('../models/category')

function listProduct(req, res){
	Product.find({}).populate('cat_id').sort({'_id':-1}).exec((err, products) => {
		if(err) return res.end('Hubo un error al listar los productos')
		if(!products) return res.end('No hay productos disponibles')
		res.render('index', {
			title: 'LISTADO DE LOS PRODUCTOS DISPONIBLES',
			pro: products
		})
	})
}

function listProductForIdEdit(req, res){
	let id = req.params.id
		Product.findById(id, (err, product) => {
			if(err) return res.end('Hubo un error al mostrar el producto')
			if(!product) return res.end('No se encontro el producto')
			Category.find({}, (err, categories) => {
				res.render('edit', {
					title: 'EDITAR PRODUCTO',
					action: '/update/' + id + '?_method=PUT',
					p: product,
					cat: categories
				})
			})
		})
}

function saveProduct(req, res){
	let p = new Product()
		p.name = req.body.name
		p.description = req.body.description
		p.price = req.body.price
		p.cat_id = req.body.cat_id
		p.save((err, productStored) => {
			if(err) return res.end('Hubo un problema al guardar el producto')
				res.redirect('/')
		})
}

function updateProduct(req, res){
	let id = req.params.id
	let product = req.body
		Product.findByIdAndUpdate(id, product, {new:true}, (err, productUpdated) => {
			if(err) return res.end('Hubo un error al actualizar el producto')
				res.redirect('/')
		})
}

function listProductForIdDelete(req, res){
	let id = req.params.id
	Product.findById(id).populate('cat_id').exec((err, product) => {
		if(err) return res.end('Hubo un error al mostrar el producto')
		if(!product) return res.end('No se encontro el producto')
		res.render('show', {
			title: 'ELIMINAR PRODUCTO',
			action: '/delete/' + id + '?_method=DELETE',
			p: product
		})
	})
}

function deleteProduct(req, res){
	let id = req.params.id
		Product.findById(id, (err, product) => {
			if(err) return res.end('Hubo un error al eliminar el producto')
			product.remove((err) => {
				if(err) return res.end('Hubo un error al eliminar el producto o ya fue eliminado')
					res.redirect('/')
			})
		})
}

module.exports = {
	listProduct,
	listProductForIdEdit,
	saveProduct,
	updateProduct,
	listProductForIdDelete,
	deleteProduct
}