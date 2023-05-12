searchFormBtn.addEventListener('click', () => {                               // Le agrego un EventListener al butón de Form (Capture el valor del elemento HTML en el modulo "nodes.js" asi ya no lo tengo que hacer acá) y le digo que cada vez que le hagan click cambie el "hash" de la URL a #search=
  location.hash = '#search=';
});

trendingBtn.addEventListener('click', () => {                                 // Hago que el boton de tendencias cambie la URL a #trends y por ende nos enviará a esa vista
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {                                   // Hago que la flecha blanca/morada cambie la URL a #home y por ende nos enviará a esa vista
  location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);                // Se ejecuta la función "navigator" cuando se cargan todos los componentes de HTML
window.addEventListener('hashchange', navigator, false);                      // Se ejecuta la función "navigator" cada vez que se cambia el "hash" #


function navigator () {                                                       // Revisa con que "hash" # termina la URL y ejecuta una función dependiendo del "hash"
  console.log({ location });

  location.hash.startsWith('#trends')  ? trendsPage()       :                 // En vez de anidar y escribir tanso "if/else if" puedo "anidar Operadores Ternarios" para hacer las verificaciones
  location.hash.startsWith('#search=') ? searchPage()       :
  location.hash.startsWith('#movie=')  ? movieDetailsPage() :
  location.hash.startsWith('#category=') ? categoriesPage()  :
  homePage();
}

function homePage() {
  console.log('Home!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
};

function trendsPage() {
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
};

function searchPage() {
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
};

function movieDetailsPage() {
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
  //headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
};

function categoriesPage() {
  console.log('Categories!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=')                                // Nos crea un nuevo Array tomando de separación el simbolo indicado (=), el array seria asi: ['#category', 'id-name'], Puedo asignar los valores como dice ECMAScript 6 con [varible1, variable2] y la primer variable solo la llame "_" porque no me va a sevir mucho en realidad
  const [categoryId, categoryName] = categoryData.split('-');                       // Vuelo a crear un nuevo Array con el objetivo de separa el número de id con el simbolo "-", el valor que necesito lo guardo en la variable "categoryId" (ECMAScript 6) y lo mando como argumento en la función para recibir las peliculas por categoria

  const categoryNameAccent = decodeURI(categoryName);                               // Como mostramos el "categoryName" en la URL las tildes y espacios nos lo codifica en simbolos parecidos a "%20", para descodificarlos usamos el método "decodeURI"
  headerCategoryTitle.innerHTML = `${categoryNameAccent}`;                          // Indicamos que muestre el titulo de la categoria correspondiente

  getMoviesByCategory(categoryId);
};
