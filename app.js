const express =  require("express")
const path = require('path')
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const { static } = require("express")
const session = require("express-session")
const passport = require('passport')
//Load config
dotenv.config({ path: './config/config.env'})

//Passport Config
require('./config/passport')(passport)

connectDB()

const app =  express()

//Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs' , exphbs({defaultLayout: 'main', extname: '.hbs'}) )
app.set('view engine', '.hbs')

//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT =  process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `))