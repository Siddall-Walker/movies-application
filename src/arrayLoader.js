let mid = '';
let $ = require("jquery");
import {getMovies, editMovie, deleteMovie} from './api.js';
const omdbApi = require('omdb-client');

const pushObj = {

    title:'',
    id:'',
    poster:'',
    plot:'',
};
let newMovie = Object.create(pushObj);

function dbChecker() {

   return getMovies().then( (movies)=> {

           movies.forEach( (movie)=> {

               let title = movie.title;
               let rating = movie.rating;
               let id = movie.id;

               let params = {
                   apiKey: 'd294c676',
                   id: id,
                   type: 'movie',
                   plot: 'short'
               };

               omdbApi.get(params, function(err, data) {

                   if ( data === null){
                       return;
                   }

                   let newMovie = {};

                    newMovie.title = title;
                    newMovie.id = id;
                    newMovie.plot = data.Plot;
                    newMovie.poster = data.Poster;

                   if(data.Ratings.length > 0) {
                       newMovie.rating = data.Ratings[0].Value;
                       let rating = `<p class="card-text"> Rotten Tomatoes: ${data.Ratings[0].Value}</p>`;

                   } else {newMovie.rating = "";
                        let rating = "";
                   }

                   newMovie.plot = data.Plot;
                    mid = data.imdbID;

                   let poster = `<img class="card-img-top" src="${data.Poster}" alt="Card image cap">`;

                   if(data.Poster === "N/A"){
                       poster = '';
                   }

                    let card  = `<div class="card shadows" style="width: 18rem;">
                    ${poster}
                    <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    ${rating}
                    <p class="card-text">  ${data.Plot}</p>
                    <button class="delete"   value="${data.imdbID}" type="button">delete</button>
                    </div>
                    </div>`;

                    $("#movies").append(card);

                   editMovie(newMovie);

                   $(".delete").unbind("click").on("click",function() {
                       let firedButton = $(this).attr('value');
                       console.log(firedButton);
                       deleteMovie(firedButton);
                       $(".container").empty();
                       dbChecker();

                   });
                });
           });
   });
}
module.exports= dbChecker;