const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=03ddae8fec3464c07fc8ce7a9ef3fb1e&query='+lat+','+long
    request({url : url, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to weatherstack!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                temperature : response.body.current.temperature,
                rain : response.body.current.precip,
                description : response.body.current.weather_descriptions[0]

            })
            
        }    
        
    })
    
    
    

}


module.exports = forecast