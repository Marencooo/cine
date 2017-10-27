var films = [];
var filmsDataAccesObjet = new filmsDAO();


filmsDataAccesObjet.getfilm().then(function (res){
    films= res.data;
    console.log(res.data);
    //rendertablet(films); //funcion que tiene el archivo que subió
});




function deletefilm(film){
    filmsDataAccesObjet.deletefilm(film)
    .then(function (){
        //al array que tengo en memoria le voy a sacar el que acabo de eliminar
        films = films.filter(function (f) {
            return f.id != film.id;
        }); 
        //vuelvo a dibujar la tabla en la vista
        rendertable(films); // funcion del otro archivo
    })

    .catch(function (errResp) {
        //esta funcion se ejecuta cuando el request retorna un error
        alert("Error al eliminar pelicula");
    });
}

function addFilm(e, form) {

    e.preventDefault();
    // obtengo todos los datos del formulario
    var filmNam = form.filmName.value;
    var filmYear = Number(form.filmYear.value);
    var filmGenre = form.filmGenre.value;
    var filmVoters = Number(form.filmVoters.value);
    var filmTotalVotes = Number(form.filmTotalVotes.value);
}

    // me fijo si la pelicula ya esta cargada
    var existingFilm = getFilm(filmName);

    // si esta cargada?
    if (existingFilm != undefined) {
        alert("La película ya está en nuestra base de datos");
        // si no esta cargada
    } else {
        var film = {
            name: filmName,
            year:  Number(filmYear),
            genre: filmGenre,
            voters: filmVoters,
            totalVotes: filmTotalVotes,
            raiting: getRaiting(filmVoters, filmTotalVotes)
        };
        AgregarTd();
        // agrego la pelicula al array
        
        //hago un request para agregar la pelicula a la bd
        filmsDataAccesObjet.addfilm(film).then(function (res){
            var addfilmbd = res.data;
            //agrego la pelicula al array
            films.push(addfilmbd);

            cleanAddFilmForm(form);
            
            addFilmtoTable(addfilmbd);
        })
        .catch(function (errResp){
            alert("No se pudo agregar la pelicula");
        });


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


function Filters (FormFilter){
    var TableFilms = document.getElementById("TableFilm");
    var TableFilter = document.getElementById("TableFilter");

    var Name    = TableFilter.filmName.value;
    var Year    = Number(TableFilter.filmYear.value);
    var GeneroIndex  = TableFilter.filmGenre.selectedIndex;
    var Genero  = TableFilter.filmGenre.value;
    var Puntaje = Number(TableFilter.puntaje.value);
    
    if (Name != ""){
        films = films.filter(function(film){
            return film.name.toLowerCase() != Name.toLowerCase();
        });

        var rows = TableFilms.rows;
        for(var i=1; i< rows.length; i++){
            var rowactual = rows[i];
            if(rowactual.cells[0].innerHTML != Name){                
               TableFilms.deleteRow(i);
               i--;
            }
        }
    }
    if (Year != ""){
        films = films.filter(function(film){
            return film.year != Year;
        });

        var rows = TableFilms.rows;
        for(var i=1; i< rows.length; i++){
            var rowactual = rows[i];
            if(rowactual.cells[1].innerHTML < Year){                
               TableFilms.deleteRow(i);
               i--;
            }
        }
    }
    if (GeneroIndex != 0){
        films = films.filter(function(film){
            return film.genre != Genero;
        });
        var rows = TableFilms.rows;
        for(var i=1; i< rows.length; i++){
            var rowactual = rows[i];
            if(rowactual.cells[2].innerHTML != Genero){                
               TableFilms.deleteRow(i);
               i--;
            }
        }
    }
    if (Puntaje != ""){
        films = films.filter(function(film){
            return film.raiting != Puntaje;
        });
        
        var rows = TableFilms.rows;
        for(var i=1; i< rows.length; i++){
            var rowactual = rows[i];
            if(rowactual.cells[3].innerHTML < Puntaje){ 
              TableFilms.deleteRow(i);
               i--;
            }
        }
    }
}
