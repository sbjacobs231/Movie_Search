$(function() {
	// API URL
	var omdbapi = 'http://www.omdbapi.com/?apikey=6869270f';
	// Track Movie for Details page and search
	var movieID = '';
	// Hide Details page until movie is clicked
	$('.banner').hide();

	// Clicked on Search Button
	$(document).on('click', '#submit', function(event) {
		//$('.main-content').empty();
		event.preventDefault();
		var movies = {
			s: $('#search').val(),
			y: $('#year').val()
		};
		function showMovies(data) {
			var body = $('#movies');
			var movieHTML = '';
			// No Movie Titles Match
			if (data.Response === 'False') {
				movieHTML += "<li class='no-movies'>";
				movieHTML +=
					"<i class='material-icons icon-help'>help_outline</i>No movies found that match: " +
					$('#search').val();
				movieHTML += '</li>';
			} else {
				$.each(data.Search, function(i, movie) {
					movieHTML += "<li><div class='poster-wrap'>";
					movieHTML += "<a href='#' class='details " + movie.imdbID + "'>";
					if (movie.Poster == 'N/A') {
						movieHTML +=
							'<i class="material-icons poster-placeholder">crop_original</i></a></div>';
					} else {
						movieHTML +=
							'<img class="movie-poster" src="' + movie.Poster + '"></a></div>';
					}
					movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
					movieHTML +=
						'<span class="movie-year">' + movie.Year + '</span></li>';
				});
			}
			body.html(movieHTML);
		}
		$.getJSON(omdbapi, movies, showMovies);
		// Hide Movie Details Div
		$('.banner').hide();
		// Show List of Relevant Movies
		$('.main-content').show();
	});
	// Details page
	// Clicked on Specific Movie for details
	$(document).on('click', '.details', function(event) {
		//$('.banner').empty();
		movieID = $(this)
			.attr('class')
			.substring(8);
		var movieDetails = {
			i: movieID
		};
		function showMovie(movie) {
			// Get JSON for specific movie title
			var link = 'http://www.imdb.com/title/' + movieID;
			// Construct HTML for Movie Details
			var htmlText = "<h3 class='back'>< Search results</h3>";
			htmlText += '<h1>' + movie.Title + '(' + movie.Year + ')' + '</h1>';
			htmlText += '<h3>IMDB Rating: ' + movie.imdbRating + '</h3></div>';
			if (movie.Poster == 'N/A') {
				htmlText +=
					"<div class='about'><i class='material-icons poster-placeholder'>crop_original</i>";
			} else {
				htmlText += "<div class='about'><img src='" + movie.Poster + "'>";
			}
			htmlText += '<div><p><b>Plot Synopsis: </b>' + movie.Plot + '</p>';
			htmlText += '<p><b>Genre: </b>' + movie.Genre + '</p>';
			htmlText += '<p><b>Actors:</b> ' + movie.Actors + '</p>';
			htmlText +=
				"<a href='" +
				link +
				"' target='_blank' id='viewOnIMDB'>View on IMDB</a></div>";
			// Movie Details Div
			$('.banner').html(htmlText);
		}
		$.getJSON(omdbapi, movieDetails, showMovie);
		// Hide List of Movies
		$('.main-content').hide();
		// Show details for Movie Clicked
		$('.banner').show();
	});

	// Back Button
	$(document).on('click', '.back', function() {
		// Hide Details of specific movie
		$('.banner').hide();
		// Go back to showing original list of movies searched for
		$('.main-content').show();
	});
});
