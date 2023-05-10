const api = axios.create({
  baseURL : 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {                                                             // A parte de enviar mis API_KEY por los "headers", puedo usar "params" e indicar cualos son los parámetros que podemos agregar, siempre en formato de objeto
    'api_key': API_KEY,
  }
})

async function getTrendingMoviesPreview () {                                                          // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  const { data } = await api(`trending/movie/day`);                                                   // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
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
  const { data } = await api(`genre/movie/list?language=es`);                            // Al usar Axios ya no tengo que escribir mi URL base ya que ya la declaré             
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