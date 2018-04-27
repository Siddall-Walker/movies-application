/**
 * This file is the "entrypoint" into your application
 */
let $ = require('jquery');
import 'bootstrap';

import dbChecker from './arrayLoader.js';
import movies from './api.js';
import search from './searchFunction.js';
// import getMovies from './api.js';
// import editMovie from './api.js';
// import addMovie from './api.js';

dbChecker();

$(".se-pre-con").fadeOut("slow");

$('#add').click(function () {
    $(".se-pre-con").fadeOut("slow");
    let title = $('#Title1').val();
    let rating = $('#Rating1').val();

    let movie = {};
    movie.title = title;
    movie.rating = rating;

    let result = movies.addMovie(movie).then(newMovie => {
        console.log(newMovie);
        // $('#movies').append(newMovie);
        // dbChecker();
    });

});


$('#edit').click(function () {
    $(".se-pre-con").fadeOut("slow");
    let movieEdit = $('Title2').val();
    let ratingEdit = $('Rating2').val();
    let result = movies.editMovie({title: movie}, {rating: rating}).then(updatedMovie => {
       console.log(updatedMovie);
       dbChecker(updatedMovie);
    });
});

console.log(search);



