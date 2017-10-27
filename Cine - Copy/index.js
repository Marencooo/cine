var films = [];

function addFilm(e, form) {
    e.preventDefault();
    // obtengo todos los datos del formulario
    var filmName = form.filmName.value;
    var filmYear = Number(form.filmYear.value);
    var filmGenre = form.filmGenre.value;
    var filmVoters = Number(form.filmVoters.value);
    var filmTotalVotes = Number(form.filmTotalVotes.value);
    // me fijo si la pelicula ya esta cargada
    var existingFilm = getFilm(filmName);
    // si esta cargada?
    if (existingFilm != undefined) {
        alert("La película ya está en nuestra base de datos");
        // si no esta cargada
    } else {
        var film = {
            name: filmName,
            year: filmYear,
            genre: filmGenre,
            voters: filmVoters,
            totalVotes: filmTotalVotes,
            raiting: getRaiting(filmVoters, filmTotalVotes)
        };
        AgregarTd();
        // agrego la pelicula al array
        films.push(film);
        
        
    }
}

function getRaiting(voters, totalVotes) {
    return (totalVotes / voters).toFixed(2);
}

function getFilm(filmName) {
    return films.find(function (film) {
        return film.name.toLowerCase() == filmName.toLowerCase();
    });
}

function AgregarTd(){
    var form = document.getElementById("addFilmForm");
    var filmName = form.filmName.value;
    var filmYear = Number(form.filmYear.value);
    var filmGenre = form.filmGenre.value;
    var filmVoters = Number(form.filmVoters.value);
    var filmTotalVotes = Number(form.filmTotalVotes.value);

    var TableFilms = document.getElementById("TableFilm");
    var Row  = document.createElement("tr");

    var TdName = document.createElement("td");
    var textName = document.createTextNode(filmName);
    TdName.appendChild(textName);
    Row.appendChild(TdName);
    TableFilms.appendChild(Row);

    var TdYear = document.createElement("td");
    var textYear = document.createTextNode(filmYear);
    TdYear.appendChild(textYear);
    Row.appendChild(TdYear);
    TableFilms.appendChild(Row);

    var TdGenero = document.createElement("td");
    var textGenero = document.createTextNode(filmGenre);
    TdGenero.appendChild(textGenero);
    Row.appendChild(TdGenero);
    TableFilms.appendChild(Row);

    var TdRating = document.createElement("td");
    var rating = getRaiting(filmVoters, filmTotalVotes)
    var textRating = document.createTextNode(rating);
    TdRating.appendChild(textRating);
    Row.appendChild(TdRating);
    TableFilms.appendChild(Row);
}

function ClearTable(){
    var form = document.getElementById("addFilmForm");
    form.filmName.value= "";
    form.filmYear.value="";
    form.filmGenre.selectedIndex=0;
    form.filmVoters.value="";
    form.filmTotalVotes.value="";
    }
function ClearTableFilter(){
    var form = document.getElementById("TableFilter");
    form.filmName.value= "";
    form.filmYear.value="";
    form.filmGenre.selectedIndex=0;
    form.puntaje.value="";
}

var Name ="";

function Filters (FormFilter){
    var TableFilms = document.getElementById("TableFilm");

        Name    = FormFilter.filmName.value;
    var Year    = FormFilter.filmName.value;
    var Genero  = FormFilter-filmGenre.value;
    var puntaje = FormFilter.puntaje.value;

    if (Name != NaN || Name != undefined){
       
        TableFilms.filmName.forEach(FunctionName)
         }
}
function FunctionName(item, index){
    var TableFilms = document.getElementById("TableFilm"); 
        if(TableFilms.filmName.toLowerCase() != Name.toLowerCase()){ 
         TableFilms.deleteRow(index);
         }
}