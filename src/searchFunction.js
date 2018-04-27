let $ = require('jquery');
import 'bootstrap';
import {addMovie} from './api.js';
let omdbApi = require('omdb-client');

const newMovie = {
        title:'',
        rating:'',
        id:'',
        poster:''
};

function search() {
        $("#movies").empty();

        let inputData = $('#input-box').val();

        let params = {
            apiKey: 'd294c676',
            query: inputData,
        };

        omdbApi.search(params, function(err, data) {
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
                    `<div class="card shadows" style="width: 18rem;">
                    ${poster}
                    <div class="card-body">
                    <input type="hidden" id="${data.Search[i].imdbID}">
                    <h5 class="card-title">${data.Search[i].Title}</h5>
                    <p class="card-text">${data.Search[i].Year}</p>
                    <button class="addToCollection btn">Add to collection</button>
                    </div>
                    </div>`;

                $("#movies").append(card);

                i++;
            }); // closes forEach
        }); // closes .search method
}
module.exports= search;
