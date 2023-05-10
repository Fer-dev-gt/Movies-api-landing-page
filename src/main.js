console.log('API URL = https://loquesea.com/cualquierEndpoint?api_key=' + API_KEY);

async function getTrendingMoviesPreview () {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  const movies = data.results;                                  // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  movies.forEach(movie => {
    const trendingMoviesPreviewContainer = document.querySelector
    ('#trendingPreview .trendingPreview-movieList');           // Para seleccionar al elemento interno puedo usar los selectores como en CSS donde indico a cualquier elemento ('.trendingPreview-movieList') que se encuentre en su padre ('#trendingPreview')

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', 
    `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewContainer.appendChild(movieContainer);


  });
}


getTrendingMoviesPreview();