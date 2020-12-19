const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')
const mongoose = require('mongoose')
const db = mongoose.connection
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant_list')
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
  // res.render(`index`, { restaurants: restaurantList.results }) 沒有資料庫時 自.json檔取資料的寫法
})

app.get('/search', (req, res) => {
  function includesKeyword(text, keyword) {
    return text.toLowerCase().includes(keyword.toLowerCase())
  }
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant =>
    includesKeyword(restaurant.name, keyword) || includesKeyword(restaurant.category, keyword)
  )
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log('express is listening on localhost:${port}')
})