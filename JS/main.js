$(document).ready(() => {
    $('#searchForm').submit((e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);
    });
});
//"https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json" "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json" "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json" "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json" "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json" "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json" "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json"
function getMovies(searchText) {
    var API_URL = `http://www.omdbapi.com/?s=${searchText}&apikey=387cdace`; // 'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace'
    axios.get(API_URL)
        .then((response) => {
            console.log(response);

            let output = '';
            let movies = response.data.Search;
            $.each(movies, (index, movie) => {
                output += `
            <div class="col-md-3">
            <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
            </div>
            `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return true;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    var API_URL = `http://www.omdbapi.com/?i=${movieId}&apikey=387cdace`; //'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace'
    axios.get(API_URL)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
<div class="row">
<div class="col-md-4">
<img src="${response.Poster}" class="thumbnail">
</div>
<div class="col-md-8">
<h2>${response.Title}</h2>
<ul class="list-group">
<li class="list-group-item"><strong>Genre:</strong> ${response.Genre}</li>
<li class="list-group-item"><strong>Released:</strong> ${response.Released}</li>
<li class="list-group-item"><strong>Rated:</strong> ${response.Rated}</li>
<li class="list-group-item"><strong>IMDB Rating:</strong> ${response.imdbRating}</li>
<li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
<li class="list-group-item"><strong>Writer:</strong> ${response.Writer}</li>
<li class="list-group-item"><strong>Actors:</strong> ${response.Actors}</li>
</ul>

</div>
</div>
<div class="row">
<div class="well">
<h3>Plot</h3>
${response.Plot}
<hr>
<a href="http://imdb.com" target="_blank" class="btn btn-primary">View IMDB</a>
<a href="index.html" class="btn btn-default">Go Back To Search</a>
</div>
</div>
`;

            $('#movie').html(output);
        }).catch((err) => {
            console.log(err);
        });
}