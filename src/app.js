const path = require('path')
const express = require('express')
const hsb = require('hbs')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to srve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Krishna'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Lal Krishna'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        msg: 'Hey whasssup',
        name:'Lal Krishna'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please provide address you are searching for'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            return res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

/* app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You Should Provide some search Item'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
}) */

app.get('/help/*', (req,res) => {
    res.render('404.hbs',{
        title: '404',
        name: 'Lal Krishna',
        msg: 'Help Page Not found'
    })
})

app.get('*', (req,res) => {
    res.render('404.hbs',{
        title:404,
        name:'Lal Krishna',
        msg: 'page Not Found'
    })
})
// To start the server
app.listen(3000, () =>{
    console.log('server is up on port 3000')
})

