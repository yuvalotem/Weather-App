class Render {
    constructor(){}

    renderData(data){
        console.log(data);
        const source = $('#weather-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(data[0])
        $('#city-container').empty().append(newHTML)
    }
}