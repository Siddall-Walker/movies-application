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
                   <div id="${data.imdbID}" class="rate_widget">
                   <div value="1" class="star_1 ratings_stars"></div>
                   <div value="2" class="star_2 ratings_stars"></div>
                   <div value="3" class="star_3 ratings_stars"></div>
                   <div value="4" class="star_4 ratings_stars"></div>
                   <div value="5" class="star_5 ratings_stars"></div>
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
                ${stars}
                </div>
                </div>`;

                $("#movies").append(card);

               editMovie(newMovie);

               //Handles the delete button
               $(".delete").unbind("click").on("click",function() {
                   let firedButton = $(this).attr('value');
                   console.log(firedButton);
                   deleteMovie(firedButton);
                   $(".container").empty();
                   dbChecker();

               });

               let clicked = 0;
               let selectedRating = 0;

               $(".ratings_stars").click(
                   // Handles the click
                   function() {
                       $(this).prevAll().addBack().addClass('ratings_vote');
                        selectedRating = ($(this).attr('value'));
                        clicked = 1;




                   },
               );
               $(".ratings_stars").hover(
                   // Handles the mouseover
                   function() {
                       $(this).prevAll().addBack().addClass('ratings_over');
                       // $(this).nextAll().removeClass('ratings_vote');
                   },
                 //  Handles the mouseout if no option was clicked

                   function() {
                   //     if(clicked === 0){
                   //         $(this).prevAll().addBack().removeClass('ratings_over');
                   // }else if (clicked === 1){
                           $(this).prevAll().addBack().removeClass('ratings_over');

                           $(this).nextAll().addBack().removeClass('ratings_over')
                       // }

                   }

               );



               // $('.rate_widget').each(function(i) {
               //     let widget = this;
               //     let out_data = {
               //         widget_id : $(widget).attr('id'),
               //         fetch: 1
               //     };
               //     $.post(
               //         // 'ratings.php',
               //         out_data,
               //         function(INFO) {
               //             $(widget).data( 'fsr', INFO );
               //             set_votes(widget);
               //         },
               //         'json'
               //     );
               // });

               // function set_votes(widget) {
               //
               //     let avg = $(widget).data('fsr').whole_avg;
               //     let votes = $(widget).data('fsr').number_votes;
               //     let exact = $(widget).data('fsr').dec_avg;
               //
               //     $(widget).find('.star_' + avg).prevAll().andSelf().addClass('ratings_vote');
               //     $(widget).find('.star_' + avg).nextAll().removeClass('ratings_vote');
               //     $(widget).find('.total_votes').text( votes + ' votes recorded (' + exact + ' rating)' );
               // }
               $(".ratings_stars").click(function () {
                    let id = $(this).parent().attr('id');
                     let rating = $(this).attr('value')

               }


               );

            });
       });
     
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