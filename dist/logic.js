class APIManager {
    constructor() {
        this.cityData = []
    }

    makeValidDate(city) {
        return moment(city.updatedAt).format('LLLL')
    }

    async getCityData(cityName, lat, long) {
        const cityInfo = {
            name: cityName,
            lat: lat,
            long: long
        }
        const city = await $.get(`./city`, cityInfo)
        this.cityData.push(city)
    }

    async getDataFromDB() {
        const city = await $.get(`./cities`)
        city.forEach(c => {
            c.updatedAt = this.makeValidDate(c)
            this.cityData.push(c)
        });
    }

    async saveCity(city) {
        const cityDoc = await $.post(`./city`, city)
        cityDoc.updatedAt = this.makeValidDate(cityDoc)
        const index = this.cityData.findIndex((c => c.name === city.name));
        this.cityData[index] = cityDoc
    }

    async removeCity(cityName) {
        const city = await $.ajax({
            method: "DELETE",
            url: (`./city/${cityName}`)
        })
        this.cityData.forEach(c => {
            if (c.name === cityName) {
                delete c._id
            }
        })
    }

    async updateCity(cityName) {
        const cityDoc = await $.ajax({
            method: "PUT",
            url: `./city/${cityName}`
        })
        cityDoc.updatedAt = this.makeValidDate(cityDoc)
        const index = this.cityData.findIndex((c => c.name === cityName));
        this.cityData[index] = cityDoc
    }

    async getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            }
        })
    }

    async getCurrentCity() {
        let position = await this.getLocation()
        const lat = position.coords.latitude
        const long = position.coords.longitude
        await this.getCityData('', lat, long)
    }

    async checkUpTodate() {
        const timeNow = new moment()
        this.cityData.forEach(async c => {
            const lastUpdated = moment(c.updatedAt)
            const hoursPassed = moment.duration(timeNow.diff(lastUpdated))._data.hours
            if (hoursPassed >= 3) {
                const reuslt = await this.updateCity(c.name)
                return new Promise((resolve, reject) => {
                    resolve(reuslt)
                })
            }
        })

    }

}