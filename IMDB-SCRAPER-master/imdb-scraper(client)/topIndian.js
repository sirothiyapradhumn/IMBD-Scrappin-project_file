const form = document.querySelector('form');
//require('../imdb-scraper/scraper');
const resultsList = document.querySelector('#resultsList');

function topIndianMovie(){
   return fetch("http://localhost:3000/topIndian")
    .then(res => res.json());
}

function showResults(results) {
results.forEach(Indianmovie=>{
     const li = document.createElement('li');

        const a=document.createElement('a');
        a.textContent = Indianmovie;
         
        li.appendChild(a);
        resultsList.appendChild(li);
});
    };

topIndianMovie()
.then(showResults);
