let maxPage;                                                                                    // Declaramos variabla para obtner el valor maximo de paginas que devuelve la API de cada sección que mostremos (Tendencias, categorías y búsqueda)
let page = 1;                                                                                   // Declaramos el valor inicial de "page" para mostrar las peliculas y luego implementar un "infite scroll"
let infiniteScroll;                                                                             // Esta función guardará una función para paginación con "Infinite Scroll" haciendo la solicitud a la API con su respectiva URL

searchFormBtn.addEventListener('click', () => {                                                 // Le agrego un EventListener al butón de Form (Capture el valor del elemento HTML en el modulo "nodes.js" asi ya no lo tengo que hacer acá) y le digo que cada vez que le hagan click cambie el "hash" de la URL a #search=
  location.hash = `#search=${searchFormInput.value}`;                                           // Cambio el "hash" y le agrego el valor del input del buscador de peliculas para que aparezca el texto de lo que ingreso el usuario
});

trendingBtn.addEventListener('click', () => {                                                   // Hago que el boton de tendencias cambie la URL a #trends y por ende nos enviará a esa vista
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {                                                      // Hago que la flecha blanca/morada cambie la URL a #home y por ende nos enviará a esa vista
  const stateLoad = history.state ? history.state.loadUrl : '';                                 // Después de que naveguemos en diferentes rutas de la aplicación el 'window.history.state' se borra dando como resultado "null" por eso es que la variable "stateLoad" regresamos un string vacío o lo que queremos realmente que es el "window.history.state.loadUrl"
  stateLoad.includes('#') ? location.hash = '#home' : history.back();                           // Para lograr que regresar al "Home" incluso si la página anterior es de cualquier otro sitio Ej "Youtube" hago una validación para comprobar que el nombre "hostname" corresponda al nombre que deberia ser de nuestra página, si no lo es significa que la pagina anterior era de otro sitio web y no de nuestra página. Este método "history.back()" hace que el navegador vuelva atrás una página en la sesión
});

headerTitle.addEventListener('click', () => location.hash = "#home");                           // Si hace click en el título de la página nos devuelve al Home

window.addEventListener('hashchange', navigator, false);                                        // Se ejecuta la función "navigator" cada vez que se cambia el "hash" #
window.addEventListener('scroll', infiniteScroll, {passive: false});                            // Agregamos un evento a la "Window" que ejecuta la función de "infiniteScroll" cada que hagamos "scroll" el tercer parametro es para evitar el "preventDefault()"
window.addEventListener('DOMContentLoaded', () => {                                             // Para un buen funcionamiento de la flecha blanca, le agrego un Evento al objeto Window cada vez que se carge el contenido del DOM, Se ejecuta la función "navigator" cuando se cargan todos los componentes de HTML
  navigator();
  window.history.pushState({ loadUrl: window.location.href }, null, '');                        // Agregando un estado de carga inical, cuando se cambie un "hostname" a otro o vengamos de otro "hostname" entonces podemos agregar ese href de carga inicial con el "href", Esa propiedad de carga de estado la he llamado "loadUrl" entonces si cargamos la aplicación desde su inicio el "href" no deberá contener ningún tipo de "hash" pero si venimos de Youtube por ejemplo entonces el "loadUrl" nos dará todo el "href" se esa ruta de carga con todo y "hash"
}, false);                                                                                      // Para manejarlo con "Bubbling" el tercer parámetro lo colocamos como "false"

searchForm.addEventListener('submit', (event) => {                                              // Con esta instrucción le digo al formulario que cuando se haga un "submit/enter" haga un "preventDefault()"
  event.preventDefault();
});

searchFormInput.addEventListener('keyup', (event) => {                                          // A la cajita de busqueda le agrego un evento para que cada vez que se de un "Enter" modifique la URL con el "hash" con el valor de lo que escribió el usuario
  if(event.key === 'Enter') location.hash = `#search=${searchFormInput.value.trim()}`;    
});


function navigator () {                                                                         // Revisa con que "hash" # termina la URL y ejecuta una función dependiendo del "hash"
  console.log({ location });

  if(infiniteScroll) {                                                                          // Cuando entramos a navegación removemos de "window" el evento de "scroll" y la función/variable "infiniteScroll" la regremos a su valor inicial de "undefined"
    window.removeEventListener('scroll', infiniteScroll, {passive: false});
    infiniteScroll = undefined;
  }

  location.hash.startsWith('#trends')  ? trendsPage()       :                                   // En vez de anidar y escribir tanso "if/else if" puedo "anidar Operadores Ternarios" para hacer las verificaciones
  location.hash.startsWith('#search=') ? searchPage()       :
  location.hash.startsWith('#movie=')  ? movieDetailsPage() :
  location.hash.startsWith('#category=') ? categoriesPage() :
  homePage();

  document.body.scrollTop = 0;                                                                  // Con estas dos lines de código, empleo el métedo "scrollTop()" para asegurarme que cada vez que entro a una nueva categoria o vista se abra en la parte arriba y evitar que se muestre al inicio en cualquier otra parte
  document.documentElement.scrollTop = 0;                                                       // Esta 2 línea hacen lo mismo pero por temas de soporte a varios navegadores lo escribo de otra forma para que cubra a cualquier navegador (Parece ser Safari)
  
  if(infiniteScroll)                                                                            // Al haber cambiado de página y haber ejecutado la función "infiteScroll" dentro de las funciónes de cada sección, volvemos a agregar el evento a "window" con la variable/función "infiteScroll" que ahora tiene el valor de la función correspondiente para aplicar un "infite scroll"
    window.addEventListener('scroll', infiniteScroll, {passive: false});
  page = 1;
}

function homePage() {                                                                           // Muestra la sección principal de Home
  console.log('Home!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  headerSection.classList.remove('header-container--big');
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  likedMoviesSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  genericSection.classList.remove('genericCuadros');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();                                                                   // Estas 3 funciones muestran 3 secciones distintas de la página con info de las peliculas y categorias
  getCategoriesPreview();
  getLikedMovies();   
};

function trendsPage() {                                                                         // Muestra la sección completa de películas en tendencia
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  headerSection.classList.remove('header-container--big');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  genericSection.classList.add('genericCuadros');

  headerCategoryTitle.innerHTML = 'Tendencias';
  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;                                                  // Asignamos la función correspondiente para mostrar el infite scroll de la sección indicada                         
};

function searchPage() {                                                                         // Muestra la sección de búsquedas que hace el usuario
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  headerSection.classList.remove('header-container--big');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  genericSection.classList.add('genericCuadros');
  movieDetailSection.classList.add('inactive');

  const [_, query] = location.hash.split('=')                                                   // ['#search', 'buscador'] Ese es el array que extraigo de mi URL y lo uso para separar el valor del texto que escribio el usuario en el buscador y que será guardado en la variable "query"
  getMoviesBySearch(query);                                                                     // Invocamos a la función para generar las fichas de las peliculas con la información de la variable "query" que guarda lo que el usuario quiere buscar

  infiniteScroll = getPaginatedMoviesBySearch(query);                                           // Aplicamos una solución elegante, esta "ejecutando" la función pero adentro esta la función "async/await" como función anonima y debido como funcionan los "Closure" se queda guardado la función más anidada incluso si se esta ejecutando la función externa, esto con el fin de poder pasar como parametro a "query"
};

function movieDetailsPage() {                                                                   // Muestra la sección con detalles de la película seleccionad
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
  headerSection.classList.add('header-container--big');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  genericSection.classList.remove('genericCuadros');
  movieDetailSection.classList.remove('inactive');

  const [_, movieId] = location.hash.split('=')                                                 // ['#movie', '123456']
  getMovieById(movieId);
};

function categoriesPage() {                                                                     // Muestra las peliculas por categoría/género
  console.log('Categories!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  headerSection.classList.remove('header-container--big');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  genericSection.classList.add('genericCuadros');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=')                                // Nos crea un nuevo Array tomando de separación el simbolo indicado (=), el array seria asi: ['#category', 'id-name'], Puedo asignar los valores como dice ECMAScript 6 con [varible1, variable2] y la primer variable solo la llame "_" porque no me va a sevir mucho en realidad
  const [categoryId, categoryName] = categoryData.split('-');                       // Vuelo a crear un nuevo Array con el objetivo de separa el número de id con el simbolo "-", el valor que necesito lo guardo en la variable "categoryId" (ECMAScript 6) y lo mando como argumento en la función para recibir las peliculas por categoria

  const categoryNameAccent = decodeURI(categoryName);                               // Como mostramos el "categoryName" en la URL las tildes y espacios nos lo codifica en simbolos parecidos a "%20", para descodificarlos usamos el método "decodeURI"
  headerCategoryTitle.innerHTML = `${categoryNameAccent}`;                          // Indicamos que muestre el titulo de la categoria correspondiente

  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);                        // Aplicamos una solución elegante, esta "ejecutando" la función pero adentro esta la función "async/await" como función anonima y debido como funcionan los "Closure" se queda guardado la función más anidada incluso si se esta ejecutando la función externa, esto con el fin de poder pasar como parametro a "id"
};
