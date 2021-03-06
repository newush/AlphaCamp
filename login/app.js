const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  const userEmail = req.body.email
  const userPassword = req.body.password
  const error = 'email or password is incorrect'
  const user = users.find(user => user.email === userEmail && user.password === userPassword)
  if (user) {
    res.render('index', { user })
  } else {
    res.render('login', { user, error })
  }
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})