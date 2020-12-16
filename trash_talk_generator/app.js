const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateTrashTalk = require('./generate_trash_talk')
const targetChecked = require('./targetChecked')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {
    res.render('index')
}) 
app.post('/', (req, res) => {
    const target = req.body.target
    const trashWords = generateTrashTalk(target)
    const options = targetChecked(target)
    res.render('index', {trashWords: trashWords, options: options })
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}.`)
})