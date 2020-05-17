const fetch = require('node-fetch');
const cheerio = require('cheerio');
const searchUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const topUrl ='https://www.imdb.com/chart/top';
const topIndiaUrl = 'https://www.imdb.com/india/top-rated-indian-movies/';
const topTv =
'https://www.imdb.com/chart/toptv/';
const movieUrl = 'https://www.imdb.com/title/';

const movieCache = {};
const searchCache = {};

function searchMovies(searchTerm){
    if(searchCache[searchTerm]){
        console.log('Serving from cache:',searchTerm);
        return Promise.resolve(searchCache[searchTerm]);
    }
    
    return fetch(`${searchUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
    const movies = [];
   const $ = cheerio.load(body);
    $('.findResult').each(function(i,element){
       const $element = $(element);
        const $image = $element.find('td a img');
        const $title = $element.find('td.result_text a');
        const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
        
        const movie = {
            image: $image.attr('src'),
            title: $title.text(),
            imdbID
        }
        movies.push(movie);
        
    });
   return movies;
});
}

function getMovie(imdbID){
    if(movieCache[imdbID]){
        console.log('Serving from cache:',imdbID);
        return Promise.resolve(movieCache[imdbID]);
    }
    
     return fetch(`${movieUrl}${imdbID}`)
    .then(response => response.text())
    .then(body =>{
         const $ = cheerio.load(body);
         const $title = $('.title_wrapper h1');
         const title = $title.first().contents().filter(function(){
             return this.type=='text';
         }).text().trim();
         const rating = $(".subtext").contents().first().text().trim();
         const time = $('time').first().text().trim();
         const genres = [];
         $('.subtext a').each(function(i,element){
            const genre = $(element).text();
             genres.push(genre);
         });
         const datePublished = genres.splice(-1,1);
         const ratingValue = $('span[itemProp="ratingValue"]').text();
         const poster = $('div.poster a img').attr('src');
         const summary=$('div.summary_text').text().trim();
        const directors = [];
         $('.credit_summary_item a').each(function(i,element){
            const director = $(element).text();
             if(i==0)
             directors.push(director);
         });
         
         
         const movie = { title,
                 rating,
                 time,
                genres,
                datePublished,
                ratingValue,
                 poster,
                summary,directors};
         
         movieCache[imdbID]=movie;
         return movie;
     });
}

function topMovie(){
    return fetch(`${topUrl}`)
    .then(response => response.text())
    .then(body => {
    const movies = {};
        const movie = [];
   const $ = cheerio.load(body);
$('.lister-list').find('td.titleColumn a').each(function (i, element) {
   
    movie.push( movies[i]=$(element).text());
    });
 return movie;   
});
}

function topIndianMovie(){
    return fetch(`${topIndiaUrl}`)
    .then(response => response.text())
    .then(body => {
    const Indianmovies = {};
        const Indianmovie = [];
   const $ = cheerio.load(body);
$('.lister-list').find('td.titleColumn a').each(function (i, element) {
   
    Indianmovie.push( Indianmovies[i]=$(element).text());
    });
 return Indianmovie;   
});
}

function topTvSeries(){
    return fetch(`${topTv}`)
    .then(response => response.text())
    .then(body => {
    const TvSeries = {};
        const TvSerie = [];
   const $ = cheerio.load(body);
$('.lister-list').find('td.titleColumn a').each(function (i, element) {
   
    TvSerie.push( TvSeries[i]=$(element).text());
    });
 return TvSerie;   
});
}

module.exports ={searchMovies,getMovie,topMovie,topIndianMovie,topTvSeries};
