class filmsDAO{
    
    getfilm(){
        return axios.get("http://localhost:3000/films");
    }

    addfilm(film){
        return axios.post("http://localhost:3000/films", film);

    }

    updatefilm(film){

    }

    deletefilm(film){
        return axios.delete("http://localhost:3000/films" + film.Id);
    }
}

