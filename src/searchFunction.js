let $ = require('jquery');
import 'bootstrap';
import {getMovies,addMovie} from './api.js';
let omdbApi = require('omdb-client');

const pushObj = {
        title:'',
        rating:'',
        id:'',
        poster:''
};
let newMovie = Object.create(pushObj);
// console.log(newMovie);

function search() {
    $('#search').on('click',  () => {

        $(".container").empty();

        let inputData = $('#input-box').val();
        let params = {
            apiKey: 'd294c676',
            query: inputData,
        };
        omdbApi.search(params, function(err, data) {

            console.log(err);
            console.log(data);


            let i = 0;
            data.Search.forEach(function(){

                newMovie.title = data.Search[i].Title;
                newMovie.id = data.Search[i].imdbID;
                newMovie.poster = data.Search[i].Poster;

                let poster = `<img class="card-img-top" src="${data.Search[i].Poster}" alt="Card image cap">`;

                if(data.Search[i].Poster === "N/A"){
                    poster = '';
                }

                let card  =

            `<div class="card" style="width: 18rem;">
            ${poster}
            <div class="card-body">
            <h5 class="card-title">${data.Search[i].Title}</h5>
            <p class="card-text"> Year: ${data.Search[i].Year}</p>
            </div>
            </div>`;

                $(".container").append(card);

                i++;
                addMovie(newMovie);
            });
        })
    });
}

module.exports= search();