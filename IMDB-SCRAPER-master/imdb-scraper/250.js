const fetch = require('node-fetch');
const cheerio = require('cheerio');

var list = [];
const searchUrl = 'https://www.imdb.com/chart/top';

function getMovies(){   
return fetch(`${searchUrl}`)
    .then(response => response.text())
    .then(body => {
    const movies = [];
   const $ = cheerio.load(body);
$('.lister-list').find('td.titleColumn a').each(function (index, element) {
      movies.push($(element).text());
    });
 return movies;   
}