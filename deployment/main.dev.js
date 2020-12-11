"use strict";

//first search engine page code line 1-36
$(document).ready(function() {
    $('#searchForm').submit(function(e) {
        e.preventDefault();
        var searchText = $('#searchText').val();
        getMovies(searchText);
    });
}); //Api for Search Engine Page code line 10-36

function getMovies(searchText) {
    var API_URL = "http://www.omdbapi.com/?s=".concat(searchText, "&apikey=387cdace"); // 'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace'

    axios.get(API_URL).then(function(response) {
        console.log(response);
        var movies = response.data.Search;
        var output = '';
        $.each(movies, function(index, movie) {
            output += "\n            <div class=\"col-md-3\">\n            <div class=\"well text-center\">\n            <img src=\"".concat(movie.Poster, "\">\n            <h5>").concat(movie.Title, "</h5>\n            <a onclick=\"movieSelected('").concat(movie.imdbID, "')\" class=\"btn btn-primary\" href=\"#\">Details</a>\n            </div>\n            </div>\n            ");
        });
        $('#movies').html(output);
    })["catch"](function(err) {
        console.log(err);
    });
} //Movie Selected function line 38-43


function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
} //Individual Movie Page API code line 45-87


function getMovie() {
    var movieId = sessionStorage.getItem('movieId');
    var API_URL = "http://www.omdbapi.com/?i=".concat(movieId, "&apikey=387cdace"); //'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace';

    axios.get(API_URL).then(function(response) {
        console.log(response);
        var movie = response.data;
        var output = "\n<div class=\"row\">\n<div class=\"col-md-4\">\n<img src=\"".concat(movie.Poster, "\" class=\"thumbnail\">\n</div>\n<div class=\"col-md-8\">\n<h2>").concat(movie.Title, "</h2>\n<ul class=\"list-group\">\n<li class=\"list-group-item\"><strong>Genre:</strong> ").concat(movie.Genre, "</li>\n<li class=\"list-group-item\"><strong>Released:</strong> ").concat(movie.Released, "</li>\n<li class=\"list-group-item\"><strong>Rated:</strong> ").concat(movie.Rated, "</li>\n<li class=\"list-group-item\"><strong>IMDB Rating:</strong> ").concat(movie.imdbRating, "</li>\n<li class=\"list-group-item\"><strong>Director:</strong> ").concat(movie.Director, "</li>\n<li class=\"list-group-item\"><strong>Writer:</strong> ").concat(movie.Writer, "</li>\n<li class=\"list-group-item\"><strong>Actors:</strong> ").concat(movie.Actors, "</li>\n</ul>\n\n</div>\n</div>\n<div class=\"row\">\n<div class=\"well\">\n<h3>Plot</h3>\n").concat(movie.Plot, "\n<hr>\n<a href=\"http://imdb.com/title/").concat(movie.imdbID, "\" target=\"_blank\" class=\"btn btn-primary\">IMDB Page</a>\n<a href=\"index.html\" class=\"btn btn-default\">Back To Search</a>\n</div>\n</div>\n");
        $('#movie').html(output);
    })["catch"](function(err) {
        console.log(err);
    });
}