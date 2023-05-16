const api = axios.create({
  baseURL : 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {                                                                                           // A parte de enviar mis API_KEY por los "headers", puedo usar "params" e indicar cualos son los parámetros que podemos agregar, siempre en formato de objeto, y los primero valores "key" pueden escribirse sin comillas (api_key: API_KEY)
    'api_key': API_KEY,
    'language': 'es-ES',                                                                              // Recuerda que con "params" le dices a axios que coloque los valores como si estuvieran en la URL base como endpoints
  }
})

// Utils

function createMovies(movies, parentContainer) {                                                      // Genera el HTML y estructura para mostrar la pelicular por categoria o tendencia o dependiendo del Array de "movies" que nos envien, el segundo parámetro es el elemento HTML que es el contenedor a donde sera insertado la estructura HTML
  parentContainer.innerHTML = '';
  movies.forEach(movie => {
    ('#trendingPreview .trendingPreview-movieList');                                                  // Para seleccionar al elemento interno puedo usar los selectores como en CSS donde indico a cualquier elemento ('.trendingPreview-movieList') que se encuentre en su padre ('#trendingPreview')

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const likeButton = document.createElement('btn');
    likeButton.classList.add('likeBtn--container');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('likeBtn__container--liked')
      
    });

    const videoInfo = document.createElement('div');
    videoInfo.classList.add('video--info');

    const mediaName = document.createElement('div');
    mediaName.classList.add('media--name');

    const parrafoVideoInfo = document.createElement('p');
    parrafoVideoInfo.innerText = `${movie.title}`;
    
    const mediaRanting = document.createElement('div');
    mediaRanting.classList.add('media--ranting');

    const mediaNameImg = document.createElement('img');
    mediaNameImg.setAttribute('src', './src/assets/start-flaticon.png')

    const spanMedia = document.createElement('span');
    spanMedia.innerText = `${movie.vote_average.toFixed(1)}`


    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', 
    `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );
    movieImg.addEventListener('click', () => {                                                  // Le agrego un evento al contenedor de la image de cada pelicula para que al darle click nos envie a la seccion de "movieDetail" con mas info de la pelicula seleccionada
      location.hash = `#movie=${movie.id}`;
    });

    mediaRanting.append(mediaNameImg, spanMedia);
    videoInfo.append(parrafoVideoInfo, mediaRanting);
    movieContainer.append(movieImg, likeButton, videoInfo);
    parentContainer.appendChild(movieContainer);
  });
} 

function createCategories(categories, container) {
  container.innerHTML = '';

  categories.forEach(category => {
    /*
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`);

    categoryTitle.addEventListener('click', () => {                                                   // Hago que cada elemento de los géneros manden a su respectiva categoría usando los #
      location.hash = `#category=${category.id}-${category.name}`;
    })

    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);


    */
   const categoryContainer = document.createElement('div');
   categoryContainer.className = 'category-container';

   const button = document.createElement('button');
   button.className = 'category-btn';
   button.setAttribute('id', `id${category.id}`);

   button.addEventListener('click', () => {
     location.hash = `#category=${category.id}-${category.name}`;
     // location.reload()
     console.log("click button by category", category.name)
     window.scroll({
       top: 566,
       behavior: 'smooth'
     })

    })

    const p = document.createElement('p');
    p.innerText = `${category.name}`;
    button.appendChild(p);
    //categoryContainer.appendChild(button);
    container.appendChild(button);
  });

    
}


// API Callings

async function getTrendingMoviesPreview () {                                                          // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  const { data } = await api(`trending/movie/day`);                                                   // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  createMovies(movies, trendingMoviesPreviewList);
  console.log(movies);
}


async function getCategoriesPreview() {                                                               // Consume una petición que retorna las categorias de pelicular y crea los elementos HTML para mostrarlos en el FrontEnd usando ".forEach()"
  const { data } = await api(`genre/movie/list`);                                                     // Al usar Axios ya no tengo que escribir mi URL base ya que ya la declaré             
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
}


async function getMoviesByCategory(id) {                                                              // Nos filtra la peliculas por categoria, recibiendo como parámetro el "id" del género 
  const { data } = await api(`discover/movie`, {                                                      // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
    params: {                                                                                         // Cuando usamos Axios podemos enviar mas "params" dentro de la función a utilizar y no solo al inicio como arriba de este archivo, en este caso la API no pide el "id" de las categorias que quermos filtrar                 
      with_genres: id,
    },
  });         

  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  genericSection.innerHTML = ""; 
  createMovies(movies, genericSection);
}


async function getMoviesBySearch(query) {                                                             // Se ejecuta cuando le damos click al boton de busqueda/lupa genera la lista de peliculas con el texto que el usuario quiere buscar y las muestra
  query = decodeURI(query);                                                                           // Decodificamos la URL de la variable "query" para quitarle el simbolo "%20" de los caracteres especiales y lo guardo en la variable "query" para poder buscar películas que tengan espacios y tildes en su nombre
  const { data } = await api(`search/movie`, {                                                      
    params: {                                                                                         
      query,                                                                                          // La API nos dice que en sus parametro tenemos que enviar el "texto de busqueda o QUERY" esto lo hacemos a traves del objeto "params" y como el atributo "query" se llama igual a nuestra variable "query" no es necesrio escribirlos en formato clave/valor, simplemente como "query"
    },
  });         
  
  const movies = data.results;                                                                        
  genericSection.innerHTML = ""; 
  createMovies(movies, genericSection);
}


async function getTrendingMovies() {                                                                  // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  const { data } = await api(`trending/movie/day`);                                                   // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  createMovies(movies, genericSection);
}

async function getMovieById(id) {                                                                     // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  const { data: movie } = await api(`movie/${id}`);                                                   // Como el resultado no es un Objeto con lista y demas ya no tenemos que hacer un "data.results" simplemento lo guardmao en la varible "movie", para hacerlo Axios nos pide que lo hagamos con este formato "{data: movie}" para guardarlo en la variable "movie", es un Objeto con la información de mi película
  const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;                         // Guardo en la variable "MovieImgUrl" una imagen de 500 px con la id de la pelicula seleccionada
  
  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
      ),
    url(${movieImgUrl})`;                                                                             // Muestro la URL de la imagen de la pelicula seleccionada con el "id"
  
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);                                      // El método "toFixed(1)" lo usa para que solo muestre una cifra decimal

  createCategories(movie.genres, movieDetailCategoriesList);                                         // Creo una lista de categorias que esta relacionadas a los generos de la pelicula que seleccione
  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  const { data } = await api(`movie/${id}/similar`);
  const relatedMovies = data.results;
  console.log(relatedMovies);
  createMovies(relatedMovies, relatedMoviesContainer);
  relatedMoviesContainer.scrollTo(0, 0);                                                             // Con el método "scrollTo(0, 0)" le indico al contenedor que comience en la pocición (0, 0)
}