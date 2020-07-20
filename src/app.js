const express = require('express')
const hbs = require('hbs')
const e = require('express')
const request = require('request')
const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup handlebars engine and views location
app.use(express.static(publicDirectoryPath))

app.get('', (req , res) => {
    res.render('index',{
        title : 'Weather app',
        name : 'Dushyant'
    })
})
app.get('/about', (req , res) => {
    res.render('about',{
        title : 'About page',
        name : 'Dushyant'
    })
})
app.get('/help', (req , res) => {
    res.render('help',{
        title : 'Help page',
        name : 'Dushyant'
    })
})

app.get('/products' , (req, res) => {
    if(!req.query.search){
        res.send({
                error : 'You must provide a search item.'
            
        })
    }
    else{
        console.log(req.query.search)        
        res.send({
        products: []
        })
    }
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        res.send({
            error : 'You must provide an address.'
        
        })
    }
    else{
        let address = req.query.address 
        
        geocode(address, ( error , data ) =>{
            if(error){
                res.send({
                    error: error
                })
            }
            else{
            forecast(data.latitude,data.longitude, (error, forecastData) => {
                if(error){
                    res.send({
                        error: error
                    })
                }
                else{
                    const forecastIs = forecastData.description + ' with ' + forecastData.temperature + ' degrees out. ' + forecastData.rain + ' % of rain.'                                    
                    res.send({
                    location : data.location ,
                    forecast : forecastIs
                    })
                }
            })
        }
    })
}
})    
          
        
        
        
app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name : 'Andew Mead',
        errorMessage : 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name : 'Andew Mead',
        errorMessage : 'Error 404 ,Page not found!'
    })
})

app.listen(port , () => {
    console.log('Server is up on port '+ port)
})

