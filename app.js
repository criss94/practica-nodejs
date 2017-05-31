'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const router = require('./routes')
const app = express()

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({ secret:'miClaveSecreta', resave:false, saveUninitialized:true }))

app.use('/', router)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

module.exports = app