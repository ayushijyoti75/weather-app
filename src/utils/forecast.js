const { error } = require('console')
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=edd6644831b9890e4cf64cf7b5ffdfe5&query=' + longitude + ',' + latitude + '&units=f'
    
    request({ url, json:true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees outside. But it feels like " + body.current.feelslike + " degrees outside.")
        }
    })
}

module.exports = forecast