console.log('API URL = https://loquesea.com/cualquierEndpoint?api_key=' + API_KEY);

async function getTrendingMoviesPreview () {                                                          // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  movies.forEach(movie => {
    const trendingMoviesPreviewContainer = document.querySelector
    ('#trendingPreview .trendingPreview-movieList');                                                  // Para seleccionar al elemento interno puedo usar los selectores como en CSS donde indico a cualquier elemento ('.trendingPreview-movieList') que se encuentre en su padre ('#trendingPreview')

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


async function getCategoriesPreview() {                                                               // Consume una petición que retorna las categorias de pelicular y crea los elementos HTML para mostrarlos en el FrontEnd usando ".forEach()"
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
  const data = await res.json();
  const categories = data.genres;
  categories.forEach(category => {
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`);
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);
  });
}









getTrendingMoviesPreview();
getCategoriesPreview();