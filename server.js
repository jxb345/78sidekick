const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3019;
const models = require('./models.js');

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded( {extended: true} ));
app.use(cors());

// app.use(function(req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });

app.get('/test', (req, res) => {
  models.fetchMetadata('78_my-song-of-the-west_patsy-montana-prairie-ramblers-holmes_gbia0086808b', (err, metadata) => {
    if (err) { throw err; }
    res.send(metadata.files);
  });
});

app.post('/query', (req, res) => {
  console.log('req.body.data', req.body.data)
  let year = req.body.data.year;
  let genre = req.body.data.genre;
  let randomYear = req.body.data.yearButtonOn
  let randomGenre = req.body.data.genreButtonOn;
  console.log('randomGenre', randomGenre)
  if (randomYear === 'true') {
    year = models.generateRandomYear();
    console.log('randomYear invoked!', year)
  }


  if (randomGenre === 'true') {
    console.log('randomGenre invoked!')
    genre = models.generateRandomGenre();

  }
  console.log('genre', genre);
  models.fetchSong(genre, year, (err, result) => {
    if (err) { throw err };
    console.log('result', result);
    result.url = `https://archive.org/embed/${result.identifer}`;
    res.send(result);
  })
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
});