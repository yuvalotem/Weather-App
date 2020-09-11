class APIManager {
    constructor() {
        this.cityData = []
    }

    async getCityData(cityName) {
        const city = await $.get(`./city/${cityName}`)
        this.cityData.push(city)
    }

    async getDataFromDB() {
        const city = await $.get(`./cities`)
        city.forEach(c => this.cityData.push(c));
    }

    async saveCity(city) {
        this.cityData = this.cityData.filter(c => c.name !== city.name)
        const cityDoc = await $.post(`./city`, city)
        this.cityData.push(cityDoc)
    }

    async removeCity(cityName) {
        const city = await $.ajax({
            method: "DELETE",
            url: (`./city/${cityName}`)
        })
        this.cityData.forEach(c => {
            if(c.name === cityName){
                delete c._id
            }
        })
    }

}