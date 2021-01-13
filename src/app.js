const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
// Define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bob Winter',
        footerMessage: 'Created By Bob Winter'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bob Winter',
        footerMessage: 'Created By Bob Winter'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name:'Bob Winter',
        message: 'There is no help for you!, not yet anyway. It will come later, maybe!!!',
        footerMessage: 'Created By Bob Winter'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({error})
        }
      
        forecast(latitude, longitude, (error, forecasData) => {
          if (error) {
            return res.send({error})
          }
      
          res.send({
              location,
              forcast: forecasData,
              address: req.query.address

          })

        })
      })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }

    console.log(req.query.search)
    res.send({
        products: ['we have none!']
    })
})

app.get('/help/*',(req, res) => {
    res.reder('404', {
        title: '404',
        404: 'Help article not found',
        name: 'Bob Winter'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        404: 'Page not found',
        name: 'Bob Winter'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})