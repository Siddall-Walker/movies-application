import {addMovie} from "./api";
let mid = '';
let $ = require("jquery");
import {getMovies, editMovie, deleteMovie} from './api.js';

const omdbApi = require('omdb-client');

const pushObj = {

    title:'',
    id:'',
    poster:'',
    rating:'',
    plot:'',
};
let newMovie = Object.create(pushObj);
// console.log(newMovie);

function dbChecker() {
   return getMovies().then( (data)=> {
           data.forEach( (data)=> {
               // console.log(data);

               let title = data.title;
               let rating = data.rating;
               let id = data.id;

               let params = {
                   apiKey: 'd294c676',
                   id: id,
                   type: 'movie',
                   plot: 'short'
               };

               omdbApi.get(params, function(err, data) {
                   console.log(data);
                   //console.log(err);
                   if ( data === null){
                       return;
                   }

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



                   let poster = `<img class="card-img-top" src="${data.Poster}" alt="Card image cap">`

                   if(data.Poster === "N/A"){
                       poster = '';
                   }




            let card  = `<div class="card" style="width: 18rem;">
            ${poster}
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            ${rating}
            <p class="card-text">  ${data.Plot}</p>
            <button class="delete"   value="${data.imdbID}" type="button">delete</button>
            </div>
            </div>`;

                   $(".container").append(card);





                   editMovie(newMovie);


                   $(".delete").unbind("click").on("click",function() {
                       let firedButton = $(this).attr('value');
                       console.log(firedButton);
                       deleteMovie(firedButton);


                   });


           });

           });


       });




    }



module.exports= dbChecker();

