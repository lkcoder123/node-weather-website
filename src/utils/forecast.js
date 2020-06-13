const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4a348344deccd62edc528b6a414de507&query='+ latitude + ',' + longitude
    request({url,json:true}, (error,{body}) => {

        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(body.error){
            console.log('Unable to connect at the moment',undefined)
        } else{
            const current = body.current
            callback(undefined,'It is '+current.temperature + ' outside .' + 'It feels like ' + current.feelslike)
        }
    })

}

module.exports = forecast