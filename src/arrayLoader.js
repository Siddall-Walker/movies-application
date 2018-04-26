let $ = require("jquery");
import {getMovies, addMovies} from './api.js';

const omdbApi = require('omdb-client');

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
                   plot: 'full'
               };

               omdbApi.get(params, function(err, data) {
                   // console.log(data);
                   //console.log(err);

            let card  = `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${data.Poster}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text"> Rotton Tomatoes: ${data.Ratings[1].Value}</p>
            </div>
            </div>`;

            $(".container").append(card);


           });
       })
   })
}

module.exports= dbChecker();

