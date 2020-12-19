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
  const keyword = req.query.keyword
  //改為搜尋自  model seeds 裡資料
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

app.get('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then((restaurant) => {
      res.render('show', { restaurant })
    })
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log('express is listening on localhost:${port}')
})