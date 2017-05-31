'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authSchema = new Schema({
	name: String,
	lastName: String,
	email: {type: String, unique: true},
	password: String
})

module.exports = mongoose.model('Auth', authSchema)