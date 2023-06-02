import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './route/web'
import initAPIRoute from './route/api'
// import connection from './config/connectDB'
require('dotenv').config()
var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    console.log('Hello World!')
    next()
}
)

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//setup view engine
configViewEngine(app);
//init web routes
initWebRoute(app);
initAPIRoute(app);

app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})