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
        const cityDoc = await $.post(`./city`, city)
        const index = this.cityData.findIndex((c => c.name === city.name));
        this.cityData[index] = cityDoc
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

    async updateCity(cityName) {
        const cityDoc = await $.ajax({
            method: "PUT",
            url: `./city/${cityName}`
        })
        const index = this.cityData.findIndex((c => c.name === cityName));
        this.cityData[index] = cityDoc
    }

}