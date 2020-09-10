class APIManager {
    constructor() {
        this.cityData = []
    }

    async getCityData(cityName) {
        const city = await $.get(`./city/${cityName}`)
        this.cityData.push(city)
    }

    async getDataFromDB() {
        const city = await $.get(`./city`)
        //what should i do with this db data?
    }

    async saveCity(cityName) {
        const city = await $.post(`./city/${cityName}`)
        this.cityData.push(city)
    }

    async removeCity(cityName) {
        const city = await $.ajax({
            method: "DELETE",
            url: (`./city/${cityName}`)
        })
        this.cityData = this.cityData.filter(c => c.name === cityName)
    }

}