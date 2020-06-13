const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGsxMyIsImEiOiJja2JiNDM1amIwMHQyMnlxdmFoaWxiNmN6In0.ntkMtF4KLvKujuoCY74TtA&limit=1'

    request({url,json:true}, (error, {body}) => {
        if (error){
           callback('Unable to connect to location services') 
        } else if(body.features.length === 0){
           callback('Unable to find location. Try another search',undefined)
        } else{
            const data = body.features[0]
            callback(undefined,{
                longitude: data.center[0],
                latitude: data.center[1],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode