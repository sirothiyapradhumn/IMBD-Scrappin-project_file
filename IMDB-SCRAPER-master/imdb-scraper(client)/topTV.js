const form = document.querySelector('form');
//require('../imdb-scraper/scraper');
const resultsList = document.querySelector('#resultsList');

function topTvSerie(){
   return fetch("http://localhost:3000/topTv")
    .then(res => res.json());
}

function showResults(results) {
results.forEach(TvSerie=>{
     const li = document.createElement('li');

        const a=document.createElement('a');
        a.textContent = TvSerie;
         
        li.appendChild(a);
        resultsList.appendChild(li);
});
    };

topTvSerie()
.then(showResults);
