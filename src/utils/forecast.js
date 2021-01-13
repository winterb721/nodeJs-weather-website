const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=36b26e0ff8af0898618bb1b6a7a9e406&query=' + lat +',' + long +'&units=f'
    console.log(url)
 
    request({url, json: true},(error, {body}) => {
            if(error) {
                callback('Not able to connect to the Weather Service!', undefined)

            } else if(body.error) {
                callback(body.error.info, undefined)
            } else {    
                const current = body.current;
                callback(undefined, current.weather_descriptions[0] +'. It is currently ' + current.temperature + ' degrees out. But it feels like ' + current.feelslike )
            }
        })
}

module.exports = forecast