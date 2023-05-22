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

const lazyLoader = new IntersectionObserver((entries) => {                                            // Creo una función guardada en una variable en donde creo una nueva instancia de "Intersection Observer" la cual recibe como parámetro los "entries" que son los elementos HTML en un Array (momvieImg) que voy a estar observardo si estan apareciendo en nuestro Viewport
  entries.forEach((entry) => {                                                                        // Por cada elemento dentro de mi Array "entries" (moviesImg elementos HTML) voy a manejar su aparición dentro del Viewport
    //console.log(entry.target.setAttribute);                                                         // Cada elemento "entry" tiene propiedad y atributos como un Objeto y en especial con el "target"
    if(entry.isIntersecting) {                                                                        // Valido si la propiedad de "entry.target.isIntersecting" existe (true) lo que significa que el elemento HTML esta apariendo en el Viewport
      const url = entry.target.getAttribute('data-img');                                              // Guardo en la variable "url" la información que tiene el atributo que yo nombre como "data-img" en mi archivo HTML y que creé en este archivo JavaScript "movieImg.setAttribute('data-img')" para luego pasarle la URL de la imagen que contiene al atributo "src" haciendo que se muestre en pantalla
      entry.target.setAttribute('src', url);                                                          // Al encontrarse el elemento HTML en el Viewport indicado, le coloco la propiede "src" con su imagen correspondiente
      console.log("💖");
      lazyLoader.unobserve(entry.target);                                                             // Hago que despues de cada llamado lo deje de "observar"
    };
  });
});

function createMovies(movies, parentContainer, lazyLoad = false) {                                    // Genera el HTML y estructura para mostrar la pelicular por categoria o tendencia o dependiendo del Array de "movies" que nos envien, el segundo parámetro es el elemento HTML que es el contenedor a donde sera insertado la estructura HTML, el tercer parámetro es para cuando no queremos implementar un "Lazy Loading" por defecto lo colocamos como "false"
  parentContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const likeButton = document.createElement('btn');
    likeButton.classList.add('likeBtn--container');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('likeBtn__container--liked')
    });

    const videoInfo = document.createElement('div');
    videoInfo.classList.add('video--info');
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
    movieImg.classList.add('fade-in');                                                          // Agrego una clase para que muestre una animación para cuando aparecen las imagenes
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(                                                                      // Aqui me "invente" una propiedad del elemento HTML de "movieImg" para utilizarlo en un "Intersection Observer" para implementar un "Lazy Loader", osea que para "mientras" estos elementos no esten en el Viewport guardo la URL de la imagen que iria en el "src" en un "atributo temporal (data-img)" y cuando llegue el momento de mostrarlo paso ese URL al atributo "src"
    lazyLoad ? 'data-img' : 'src',                                                              // Si el "lazyLoad" es 'true' agrego la URL a la propiedad inventada "data-img" para mostrarla despues, ahora si es 'false' le muestro desde al inicio al pasarle la URL de la imagen a la propiedad "src"                                        
    `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );
    movieImg.addEventListener('click', () => {                                                  // Le agrego un evento al contenedor de la image de cada pelicula para que al darle click nos envie a la seccion de "movieDetail" con mas info de la pelicula seleccionada
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.addEventListener('error', () => {
      movieImg.setAttribute('src',
        'https://static.platzi.com/static/images/error/img404.png'
      );
    });
    
    if(lazyLoad) lazyLoader.observe(movieImg);                                                   // Implemento mi "Intersection Observer" que instancie en esta variable y le digo que observe a todos los Elementos "movieImg" siempre y cuando "lazyLoad" sea 'true'

    //if(!movie.poster_path) movieContainer.style.display = "none";                              // Si no hay poster de la película, ocultamos el contenedor de esa película

    mediaRanting.append(mediaNameImg, spanMedia);
    videoInfo.append(parrafoVideoInfo, mediaRanting);
    movieContainer.append(movieImg, likeButton, videoInfo);
    parentContainer.appendChild(movieContainer);
  });
} 

function createCategories(categories, container) {                                                    // Crea botones con las categorias de las películas
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

function convertMovieTime(runtime){                                                                   // Función para convertir el formato de duración de peliculas de minutos a formato "horas minuto" 
  if (runtime == 0) {
    return '(?)';
  }
  const minutes = runtime;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime = `${hours}h ${remainingMinutes}m`;

  return formattedTime;
}


// API Callings

async function getTrendingMoviesPreview () {                                                          // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  addLoadingScreenImageContainer(trendingMoviesPreviewList, 6);                                       // Agregando loading screen
  const { data } = await api(`trending/movie/day`);                                                   // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  createMovies(movies, trendingMoviesPreviewList, true);                                              // Mando 'true' en el tercer parámetro para que implemente un "Lazy Loading"
  console.log(movies);
}

async function getCategoriesPreview() {                                                               // Consume una petición que retorna las categorias de pelicular y crea los elementos HTML para mostrarlos en el FrontEnd usando ".forEach()"
  addLoadingScreenCategoriesContainer(categoriesPreviewList, 10);
  const { data } = await api(`genre/movie/list`);                                                     // Al usar Axios ya no tengo que escribir mi URL base ya que ya la declaré             
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {                                                              // Nos filtra la peliculas por categoria, recibiendo como parámetro el "id" del género 
  addLoadingScreenImageContainer(genericSection, 6);                                                  // Agregando loading screen
  const { data } = await api(`discover/movie`, {                                                      // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
    params: {                                                                                         // Cuando usamos Axios podemos enviar mas "params" dentro de la función a utilizar y no solo al inicio como arriba de este archivo, en este caso la API no pide el "id" de las categorias que quermos filtrar                 
      with_genres: id,
    },
  });         

  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  genericSection.innerHTML = ""; 
  createMovies(movies, genericSection, true);
}

async function getMoviesBySearch(query) {                                                             // Se ejecuta cuando le damos click al boton de busqueda/lupa genera la lista de peliculas con el texto que el usuario quiere buscar y las muestra
  query = decodeURI(query);                                                                           // Decodificamos la URL de la variable "query" para quitarle el simbolo "%20" de los caracteres especiales y lo guardo en la variable "query" para poder buscar películas que tengan espacios y tildes en su nombre
  addLoadingScreenImageContainer(genericSection, 6);                                                  // Agregando loading screen
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
  addLoadingScreenImageContainer(genericSection, 6);                                                  // Agregando loading screen
  const { data } = await api(`trending/movie/day`);                                                   // Hacemos una solicitud usando "Axios", ya tenemos registrada la URL base, ya solo tenemos que definir el "endpoint" en especifico que queremos utilizar
  const movies = data.results;                                                                        // Guardamos en la variable "movies" la propiedad de nuestra respuestas que se llama ".results" la otra propiedad es ".page"
  createMovies(movies, genericSection);
}

async function getMovieById(id) {                                                                     // Hace petición para recibir las 20 peliculas en tendencias y genera HTML para mostrarlas en un slide usando ".forEach()"
  addLoadingScreenText(movieDetailTitle, 1);
  addLoadingScreenText(movieDetailDescription, 5);
  addLoadingScreenCategoriesContainer(movieDetailCategoriesList, 4);
  const baseBgUrl = 'https://image.tmdb.org/t/p/original';                                            // Para imagenes de alta definición
  const { data: movie } = await api(`movie/${id}`);                                                   // Como el resultado no es un Objeto con lista y demas ya no tenemos que hacer un "data.results" simplemento lo guardmao en la varible "movie", para hacerlo Axios nos pide que lo hagamos con este formato "{data: movie}" para guardarlo en la variable "movie", es un Objeto con la información de mi película
  const movie_banner = (movie.backdrop_path ?                                                         // Guardo en la variable "movie_banner" una imagen de alta definición con la id de la pelicula seleccionada
    baseBgUrl + movie.backdrop_path : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`);        
  
  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
      ),
    url(${movie_banner})`;                                                                             // Muestro la URL de la imagen de la pelicula seleccionada con el "id"
  
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  //if(movieDetailDescription.innerText == '') movieDetailDescription.style.width = '767px';          // Lo aplico si en el MovieDetail no existe una descripción y hay mucha info en blanco
  movieDetailScore.textContent = movie.vote_average.toFixed(1);                                       // El método "toFixed(1)" lo usa para que solo muestre una cifra decimal
  movieDetailRelease.textContent = `Release Date:  ${movie.release_date}`;
  movieDetailRuntime.textContent = `Duration: ${convertMovieTime(movie.runtime)}`;
  movieDetailImg.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)

  createCategories(movie.genres, movieDetailCategoriesList);                                          // Creo una lista de categorias que esta relacionadas a los generos de la pelicula que seleccione
  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  addLoadingScreenImageContainer(relatedMoviesContainer, 6);
  const { data } = await api(`movie/${id}/similar`);
  const relatedMovies = data.results;
  console.log(relatedMovies);
  createMovies(relatedMovies, relatedMoviesContainer);
  relatedMoviesContainer.scrollTo(0, 0);                                                              // Con el método "scrollTo(0, 0)" le indico al contenedor que comience en la pocición (0, 0)
}


// Loading Screens

function addLoadingScreenImageContainer(nodeContainer, times) {
  const movieContainer = document.createElement('div');
  const movieImage = document.createElement('img');
  movieContainer.classList.add('movie-container');
  movieContainer.id = 'loading-screen';
  movieImage.classList.add('movie-img');
  movieImage.classList.add('loading-skeleton');
  movieContainer.appendChild(movieImage);
  for (let i = 0; i < times; i++) {
      const nodeClone = movieContainer.cloneNode(true);
      nodeContainer.appendChild(nodeClone);
  }
}

function addLoadingScreenCategoriesContainer(nodeContainer, times) {
  const categoryContainer = document.createElement('div');
  const categoryTitle = document.createElement('h3');
  categoryContainer.id = 'loading-screen';
  categoryContainer.classList.add('category-container');
  categoryTitle.classList.add('loading-skeleton');
  categoryTitle.classList.add('skeleton-text');
  categoryContainer.appendChild(categoryTitle);
  for (let i = 0; i < times; i++) {
      const nodeClone = categoryContainer.cloneNode(true);
      nodeContainer.appendChild(nodeClone);
  }
}

function addLoadingScreenText(nodeContainer, times) {
  const textContainer = document.createElement('div');
  textContainer.id = 'loading-screen';
  textContainer.classList.add('loading-skeleton');
  textContainer.classList.add('skeleton-desc');
  for (let i = 0; i < times; i++) {
      const nodeClone = textContainer.cloneNode(true);
      nodeContainer.appendChild(nodeClone);
  }
}
