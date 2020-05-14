const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
      return(res.send("Error: Address term need to be include in query"))
    }
    
    geocode(req.query.address,(error,{latitude,longitude,placename}={})=>
    {
        if(error)
        {
            return (res.send (({error:"Failed to fetch longitutde and latitude for given address"})))
        }
        
        forecast(latitude,longitude,(error,resForecast)=>{

            if (error){
                console.log(error )
                return (res.send (({error:"Failed to fetch forecast data for given address"})))
            }
            
            res.send({
                forecast: resForecast,
                location: latitude+" "+longitude,
                address : req.query.address
            })

        })
    })

    
})

app.get('/products',(req,res)=>{

    if(!req.query.search)
    {
       return ( res.send("search term needs to be included"))
    }

res.send({
    products:{
        title: 'name',
        pen:'blue'
    }
})

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})