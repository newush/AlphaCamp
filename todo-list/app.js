// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
mongoose.connect('mongodb://localhost/todo-list', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
const Todo = require('./modules/todo')
const bodyParser = require('body-parser')

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb, connected!')
})
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true}))
// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})
app.get('/todos/new', (req,res) => {
  return res.render('new')
})
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
})
// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})