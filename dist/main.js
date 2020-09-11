const renderer = new Render
const api = new APIManager

const loadPage = async function(){
    await api.getDataFromDB()
    renderer.renderData(api.cityData)
}

const handleSearch = async function(cityName){
    cityName = cityName.toLowerCase()
    await api.getCityData(cityName)
    renderer.renderData(api.cityData)
}

$('#search-button').on('click', function(){
    const cityName = $('#city-input').val()
    handleSearch(cityName)
    $('#city-input').val('')
})

$('#city-container').on('click', '.add-city', async function(){
    const cityName = $(this).closest('div').find('.city-name').text()
    const cityDoc = api.cityData.find(c => c.name === cityName)
    await api.saveCity(cityDoc)
    renderer.renderData(api.cityData)
})

$('#city-container').on('click', '.remove-city', async function(){
    const cityName = $(this).closest('div').find('.city-name').text()
    await api.removeCity(cityName)
    renderer.renderData(api.cityData)
})

loadPage()