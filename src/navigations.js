window.addEventListener('DOMContentLoaded', navigator, false);                // Se ejecuta la función "navigator" cuando se cargan todos los componentes de HTML
window.addEventListener('hashchange', navigator, false);                      // Se ejecuta la función "navigator" cada vez que se cambia el "hash" #


function navigator () {                                                       // Revisa con que "hash" # termina la URL y ejecuta una función dependiendo del "hash"
  console.log({ location });

  if(location.hash.startsWith('#trends')) {                                   // Verificamos lo que dice nuestra URL si contiene el "hash" (#) y ejecutamos la pantalla correspondiente a cada hash
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
}

function homePage() {
  console.log('Home!!');
  getTrendingMoviesPreview();
  getCategoriesPreview();
};

function trendsPage() {
  console.log('TRENDS!!');
};

function searchPage() {
  console.log('Search!!');
};

function movieDetailsPage() {
  console.log('Movie!!');
};

function categoriesPage() {
  console.log('Categories!!');
};
