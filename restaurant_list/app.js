const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection
const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.set('view engine', 'handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbsHelpers }))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})