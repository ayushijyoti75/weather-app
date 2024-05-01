const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) +'&access_token=pk.eyJ1IjoiYXl1c2hpanlvdGkiLCJhIjoiY2x2a256NmEwMGptNDJpbXdoNzN1bHhnZiJ9.M5NI06IDj1nH9Og5aYifFw'

    request({ url, json:true }, (error, {body} = {}) => {
        if(error) {
            callback('unable to connect to the server!!', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.name
            })

        }
    })
}

module.exports = geocode