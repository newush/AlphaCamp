const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/handlebars')

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

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find(
    {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } }
      ]
    })
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => {
      res.render('show', { restaurant })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const name_en = req.body.name_en
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const google_map = req.body.google_map
  const description = req.body.description

  return Restaurant.create({
    name, category, name_en, location, phone, rating, image, google_map, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const name_en = req.body.name_en
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const image = req.body.image
  const google_map = req.body.google_map
  const description = req.body.description

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.category = category
      restaurant.name_en = name_en
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.image = image
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('express is listening on localhost:${port}')
})