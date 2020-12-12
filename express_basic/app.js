//Include express from node_modules
const express = require('express')
const app = express()
//Define server related variables
const port = 3000
//Handle request and response here
app.get('/', (req, res) => {
  res.send(`This is my first Express Web App started by nodemon`)
})
app.get('/food', (req, res) => {
  res.send('My favorite food is ice cream')
})
app.get('/popular/languages', (req, res) => {
  res.send(`JavaScript is a popular language`)
})
app.get('/popular/languages/:language', (req, res) => {
  res.send(`<h1>${req.params.language} is a popular language</h1>`)
})
//Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
