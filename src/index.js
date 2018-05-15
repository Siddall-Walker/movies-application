/**
 * This file is the "entrypoint" into your application
 */
let $ = require('jquery');
import 'bootstrap';

import dbChecker from './arrayLoader.js';
import movies from './api.js';
import search from './searchFunction.js';

dbChecker();

$(".se-pre-con").fadeOut("slow");


$('#edit').click(function () {
    $(".se-pre-con").fadeOut("slow");
    let movieEdit = $('Title2').val();
    let ratingEdit = $('Rating2').val();
    let result = movies.editMovie({title: movie}, {rating: rating}).then(updatedMovie => {
       console.log(updatedMovie);
       dbChecker(updatedMovie);
    });
});

$('#search').on('click',  (event) => {
    event.preventDefault();
    $(".se-pre-con").fadeOut("slow");
    search()

    // adds event listeners to elements w/ .addToCollection (add to my collection button)
    $("#movies").on('click', '.addToCollection', (event) => {

        let newMovie = {};

        let movieCard = $(event.target).parent().parent();

        console.log(movieCard.children("img").attr('src'));

        newMovie.id = movieCard.children().last().children("input").attr('id');
        newMovie.title = movieCard.children().last().children("h5").text();
        newMovie.year = movieCard.children().last().children("p").text();
        newMovie.poster = movieCard.children("img").attr('src');

        movies.addMovie(newMovie);
    });
});
