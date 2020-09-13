const renderer = new Render
const api = new APIManager

const handleSearch = async function (cityName, lat, long) {
    cityName = cityName.toLowerCase()
    await api.getCityData(cityName, lat, long)
    renderer.renderData(api.cityData)
}

const loadPage = async function () {
    await api.getCurrentCity()
    await api.getDataFromDB()
    if (api.cityData.length > 0) {
        await api.checkUpTodate()
    }
    renderer.renderData(api.cityData)
}

$('#search-button').on('click', function () {
    const cityName = $('#city-input').val()
    handleSearch(cityName, '', '')
    $('#city-input').val('')
})

$('#city-container').on('click', '.add-city', async function () {
    const cityName = $(this).closest('.city').find('.city-name').text()
    const cityDoc = api.cityData.find(c => c.name === cityName)
    await api.saveCity(cityDoc)
    renderer.renderData(api.cityData)
})

$('#city-container').on('click', '.remove-city', async function () {
    const cityName = $(this).closest('.city').find('.city-name').text()
    await api.removeCity(cityName)
    renderer.renderData(api.cityData)
})

$('#city-container').on('click', '.update-city', async function () {
    const cityName = $(this).closest('.city').find('.city-name').text()
    await api.updateCity(cityName)
    renderer.renderData(api.cityData)
})


loadPage()