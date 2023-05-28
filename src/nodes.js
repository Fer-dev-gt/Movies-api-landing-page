const $ = (id) => document.querySelector(id);                                     // Defino una función base para seleccionar los elementos, la función se llama "$"


// Sections
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');
const likedMoviesSection = $('#liked');
const maxPageReached = $('#max-page');

// Lists & Containers
const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');
const categoriesPreviewList = $('.categoriesPreview-list');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
const likedMoviesListArticle = $('.liked-movieList');

// Elements
const headerTitle = $('.header-title');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');
const selectLanguage = $('#languages')
const favoriteBtn = $('.likeBtn--container');
const trendingPreviewTitle = $('.trendingPreview-title');
const trendingBtn = $('.trendingPreview-btn');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');

const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');
const movieDetailImg = $('.imgMovieDetail');
const movieDetailRelease = $('.movieDetail-release');
const movieDetailRuntime = $('.movieDetail-runtime');




























/*
// Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');

// Lists & Containers
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

// Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');
*/