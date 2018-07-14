'use strict';

$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        console.log($('#searchText').val());
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('https://www.omdbapi.com?s=' + searchText + '&apikey=thewdb').then(function (response) {
        console.log(response);
        var movies = response.data.Search;
        var output = '';
        $.each(movies, function (index, movie) {
            output += '\n                <div class="col-md-3">\n                    <div class="card text-center">\n                        <img src="' + movie.Poster + '">\n                        <h5>' + movie.Title + '</h5>\n                        <a onclick="movieSelector(\'' + movie.imdbID + '\')" href="#" class="btn btn-primary">Movie Details</a>\n                    </div>\n                </div>\n            ';
        });
        $('#movies').html(output);
    }).catch(function (err) {
        console.log(err);
    });
}

function movieSelector(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    var movieId = sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com?i=' + movieId + '&apikey=thewdb').then(function (response) {
        console.log(response);
        var movie = response.data;
        var output = '\n            <div class="row">\n                <div class="col-md-4">\n                    <img src="' + movie.Poster + '" class="img-thumbnail">\n                </div>\n                <div class="col-md-8">\n                    <h2>' + movie.Title + '</h2>\n                        <ul class="list-group">\n                            <li class="list-group-item"><strong>Genre:</strong> ' + movie.Genre + '</li>\n                            <li class="list-group-item"><strong>Released:</strong> ' + movie.Released + '</li>\n                            <li class="list-group-item"><strong>Rated:</strong> ' + movie.Rated + '</li>\n                            <li class="list-group-item"><strong>IMDB Rating:</strong> ' + movie.imdbRating + '</li>\n                            <li class="list-group-item"><strong>Director:</strong> ' + movie.Director + '</li>\n                            <li class="list-group-item"><strong>Writer:</strong> ' + movie.Writer + '</li>\n                            <li class="list-group-item"><strong>Actors:</strong> ' + movie.Actors + '</li>\n                        </ul>\n                </div>\n            </div>\n            <div class="row">\n                <div class="well">\n                    <h3>Plot</h3>\n                    ' + movie.Plot + '\n                    <hr>\n                    <a href="http://imdb.com/title/' + movie.imdbID + '" target="_blank" class="btn btn-primary">View IMDB</a>\n                    <a href="index.html" class="btn btn-default">Go Back To Search</a>\n                </div>\n            </div>     \n            ';
        $('#movie').html(output);
    }).catch(function (err) {
        console.log(err);
    });
}