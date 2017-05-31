'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('./category')

const productSchema = new Schema({
	name: String,
	description: String,
	price: { type: Number, default: 0 },
	cat_id: { type: Schema.ObjectId, ref: 'Category' }	
})

module.exports = mongoose.model('Product', productSchema)