const express = require('express')
const axios = require('axios')
const City = require('../../city')
const moment = require('moment')

const route = express()
const key = '209e5b6a8d75041260674c4076a7f389'


route.get("/city", async (req, res) => {
    const { name, lat, long } = req.query
    let data
    if (long) {
        data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=` + key)
    } else {
        data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=` + key)
    }
    const cityDoc = {
        name: data.data.name.toLowerCase(),
        temperature: data.data.main.temp,
        condition: data.data.weather[0].main,
        conditionPic: data.data.weather[0].icon,
        updatedAt: moment(Date.now()).format('LLLL')
    }
    res.send(cityDoc)
})

route.get("/cities", async (req, res) => {
    const cities = await City.find({})
    res.send(cities)
})

route.post("/city", async (req, res) => {
    const cityDoc = req.body
    const c = new City(cityDoc)
    await c.save()
    res.send(c)
})

route.delete("/city/:cityName", async (req, res) => {
    const { cityName } = req.params
    await City.remove({ name: cityName })
    res.end()
})

route.put("/city/:cityName", async (req, res) => {
    const { cityName } = req.params
    const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=` + key)
    const updated = await City.findOneAndUpdate({ name: cityName },
        {
            $set:
            {
                temperature: data.data.main.temp,
                condition: data.data.weather[0].main,
                conditionPic: data.data.weather[0].icon,
                updatedAt: moment(Date.now()).format('LLLL')
            }
        },
        { new: true })
    res.send(updated)

})

module.exports = route