'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
	cat_name: String
})

module.exports = mongoose.model('Category', categorySchema)