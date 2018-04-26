let $ = require("jquery");
import {getMovies, addMovies} from './api.js';

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
                   title: title,
                   type: 'movie',
                   plot: 'short'
               };

               omdbApi.get(params, function(err, data) {
                   console.log(data);
                   //console.log(err);

                   newMovie.title = title;
                   newMovie.id = data.imdbID;
                   newMovie.poster = data.Poster;
                   newMovie.rating = data.Ratings[0].Value;
                   newMovie.plot = data.Plot;



                   let rating = `<p class="card-text"> Rotten Tomatoes: ${data.Ratings[0].Value}</p>`;
                   let poster = `<img class="card-img-top" src="${data.Poster}" alt="Card image cap">`

                   if(data.Poster === "N/A"){
                       poster = '';
                   }
                   if(data.Ratings[0].Value === undefined){
                       rating = `<p class="card-text"> IMDB Score: ${data.Ratings[0].Value}</p>`
                       newMovie.rating = data.Ratings[0].Value;

                   }

            let card  = `<div class="card" style="width: 18rem;">
            ${poster}
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            ${rating}
            <p class="card-text"> Rotten Tomatoes: ${data.Plot}</p>
            </div>
            </div>`;

            $(".container").append(card);


           });
       })
   })
}

module.exports= dbChecker();

