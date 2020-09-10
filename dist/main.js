const renderer = new Render
const api = new APIManager

const loadPage = function(data){
    renderer.renderData(data)
}

const handleSearch = async function(cityName){
    cityName = cityName.toLowerCase()
    await api.getCityData(cityName)
    renderer.renderData(api.cityData)
}

$('#search-button').on('click', function(){
    const cityName = $('#city-input').val()
    handleSearch(cityName)
})