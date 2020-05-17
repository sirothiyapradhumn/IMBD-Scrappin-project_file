const express = require('express');
const cors=require('cors');
const scraper = require('./scraper')
const app = express();

app.use(cors());
app.get('/',(req,res)=>{
   res.json({
      message: 'Scraping is fun!'
   });
});

app.get('/search/:title',(req,res)=>{
scraper
    .searchMovies(req.params.title)
    .then(movies => {
    res.json(movies);
});
});

app.get('/movie/:imdbID',(req,res)=>{
    scraper
    .getMovie(req.params.imdbID)
    .then(movie=>{
        res.json(movie);
    });
});

app.get('/top',(req,res)=>{
    scraper
    .topMovie()
    .then(movies=>{
        res.json(movies);
    });
});

app.get('/topIndian',(req,res)=>{
    scraper
    .topIndianMovie()
    .then(Indianmovies=>{
        res.json(Indianmovies);
    });
});

app.get('/topTv',(req,res)=>{
    scraper
    .topTvSeries()
    .then(TvSerie=>{
        res.json(TvSerie);
    });
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
   console.log(`Listening to ${port}`); 
});