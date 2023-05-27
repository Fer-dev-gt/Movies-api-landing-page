/*
    movieImg.setAttribute(
      'data-img',
      'https://image.tmdb.org/t/p/w300/' + movie.poster_path
    )
    observer.observe(movieImg)
*/

/* Una forma de implementar un "Intersection Observer"
function createObserver() {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.setAttribute(
          'src',
          entry.target.dataset.img
        )
    })
  })
}

let observer = createObserver();
*/



/*
console.log({entry});   
console.log({entry.target.setAttribute}); 
*/


// Para aplicar Infite Scrolling a todas las secciones

async function getPaginatedMovies(
  endPoint, 
  {
      categoryId, 
      query
  } = {},
  ) {
  const { 
      scrollTop, 
      scrollHeight, 
      clientHeight 
  } = document.documentElement;

  const scrollAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollAtBottom && pageIsNotMax) {
      page++;

      const { data } = await api(endPoint, {
          params: {
              page,
              with_genres: categoryId,
              query,
          },
      });
      const movies = data.results;

      printMoviePosters(movies, genericSection, true);
  } 
}

function getPaginatedTrendingMovies() {
  getPaginatedMovies('/trending/movie/day');
}

function getPaginatedMoviesByCategory() {
  const [_, categoryData] = location.hash.split('=');
  const [categoryId] = categoryData.split('-');
  getPaginatedMovies('/discover/movie', {categoryId});
}

function getPaginatedMoviesBySearch() {
  const [_, undecodedQuery] = location.hash.split('=');
  const query = decodeURI(undecodedQuery);
  getPaginatedMovies('/search/movie', {undefined, query});
}














// Para intentar que la variable "page" aumente de uno en uno
const waitATime = () => {
  return new Promise((movies) => {
    setTimeout(() => movies, 2000);
  });
};





// Para idiomas
languagesSelect.addEventListener('change', () => {
  lang = languagesSelect.value;
    homePage();
})