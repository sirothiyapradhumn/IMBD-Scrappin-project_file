const form = document.querySelector('form');
//require('../imdb-scraper/scraper');
const resultsList = document.querySelector('#resultsList');

function topMovie(){
   return fetch("http://localhost:3000/top")
    .then(res => res.json());
}

function showResults(results) {
results.forEach(movie=>{
     const li = document.createElement('li');

        const a=document.createElement('a');
        a.textContent = movie;
         
        li.appendChild(a);
        resultsList.appendChild(li);
});
    };

topMovie()
.then(showResults);
