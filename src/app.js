const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayushi Jyoti'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayushi Jyoti'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Ayushi Jyoti',
        helpText: 'This is help page'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a value to search'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast: 'Its raining outside',
    //     location: 'Delhi',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayushi Jyoti',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayushi Jyoti',
        errorMessage: 'Page not found'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Ayushi',
//         age: 22
//     }, {
//         name: 'Andrew',
//         age: 27
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Your weather</h1>')
// })





app.listen(3000, () => {
    console.log('Server is up on port 3000')
})