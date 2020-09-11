class Render {
    constructor(){}

    renderData(data){
        const source = $('#weather-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(data)
        $('#city-container').empty().append(newHTML)
    }
}