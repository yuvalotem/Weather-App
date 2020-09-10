class Render {
    constructor(){}

    renderData(data){
        const source = $('#weather-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ data })
        $('#weather').empty().append(newHTML)
    }
}