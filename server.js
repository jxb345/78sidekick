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

app.post('/query', (req, res) => {
  console.log('req.body.data', req.body.data)
  let year = req.body.data.year;
  let genre = req.body.data.genre;
  let randomYear = req.body.data.yearButtonOn
  let randomGenre = req.body.data.genreButtonOn;

  // opportunity for lines 34 to 43 to be contained within its own function
  if (randomYear === 'true') {
    year = models.generateRandomYear();
    console.log('randomYear invoked!', year)
  }

  if (randomGenre === 'true') {
    genre = models.generateRandomGenre();
    console.log('randomGenre invoked!')
  }

  models.fetchSong(genre, year, (err, result) => {
    year = '19' + year;
    if (err) { throw err };
    console.log('result with year');
    if (result !== undefined) {
      result.url = `https://archive.org/embed/${result.identifer}`;
      result.year = result.year.toString().slice(2);
      res.send(result);
    } else {
      let fetchWithYearFailed = true;
    if (fetchWithYearFailed) {
      models.fetchNoYearSong(genre, year, (err, result) => {
        if (err) { throw err };
      console.log('result withOUT year');
      result.year = result.year.toString().slice(2);
      result.url = `https://archive.org/embed/${result.identifer}`;
      res.send(result);
      })
    }
    }
  })
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
});