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

               var newMovie = {};

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

               let stars = ` <div class='movie_choice'>
                   <div id="r1" class="rate_widget">
                   <div class="star_1 ratings_stars"></div>
                   <div class="star_2 ratings_stars"></div>
                   <div class="star_3 ratings_stars"></div>
                   <div class="star_4 ratings_stars"></div>
                   <div class="star_5 ratings_stars"></div>
                   <!--<div class="total_votes">vote data</div>-->
               </div>
               </div>`;

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
                <div class="rateit" data-rateit-max></div>
                ${stars}
                </div>
                </div>`;

                $("#movies").append(card);

               editMovie(newMovie);

               //Handles the delete button
               $(".delete").unbind("click").on("click",function() {
                   let firedButton = $(this).attr('value');
                   deleteMovie(firedButton);
                   $(".container").empty();
                   dbChecker();





                   $(".ratings_stars").hover(
                       // Handles the mouseover
                       function() {
                           $(this).prevAll().addClass('ratings_over');
                           $(this).nextAll().removeClass('ratings_vote');
                       },
                       // Handles the mouseout
                       function() {
                           $(this).prevAll().removeClass('ratings_over');
                           // set_votes($(this).parent());
                        }
                   );
               });
            });
       });
   });
}
module.exports= dbChecker;