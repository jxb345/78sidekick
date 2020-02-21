const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3019;
const models = require('./models.js');
const text = require('./about.js');

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded( {extended: true} ));
app.use(cors());

// .get request included to prevent a 404 if user reloads on /info
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  })
})

app.post('/query', (req, res) => {
  let start = Date.now();
  let end;

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
    console.log('randomGenre invoked!', genre)
  }

  models.fetchSong(genre, year, (err, result) => {
    if (year.length === 2) {
      year = '19' + year;
    }
    if (err) { throw err };
    if (result !== undefined) {
      console.log('result with year');
      result.url = `https://archive.org/embed/${result.identifer}`;
      result.year = result.year.toString().slice(2);
      end = Date.now();
      console.log('elapsed', (end - start) / 1000.0);
      result.noYear = false;
      res.send(result);
    } else {
      let fetchWithYearFailed = true;
    if (fetchWithYearFailed) {
      models.fetchNoYearSong(genre, year, (err, result) => {
        if (err) { throw err };
      console.log('result withOUT year');
      result.year = result.year.toString().slice(2);
      result.url = `https://archive.org/embed/${result.identifer}`;
      result.noYear = true;
      end = Date.now();
      console.log('elapsed', (end - start) / 1000.0);
      res.send(result);
      })
    }
    }
  })
})

app.post('/metadata', (req, res) => {
  console.log('req.body.data------ metadata', req.body.data)
  models.fetchMetadata(req.body.data, (err, result) => {
    if (err) { throw err };
    let metadata = {};
    metadata.file = models.findFlac(result.files)
    // 'if' statement to check if creator not present
    if (result.metadata.creator == null) {
      metadata.creator = '[Artist Unknown]';
    } else {
      // the following can still result in error: metadata.creator = result.metadata.creator[0] || ''
      metadata.creator = result.metadata.creator[0]
    }
    metadata.title = result.metadata.title;
    metadata.runtime = result.metadata.runtime;
    metadata.identifier = req.body.data;
    // metadata.genre = genre;
    // metadata.year = year;
    // metadata.foundIds = foundIds;
    // callback(null, metadata)
    res.send(metadata)
  });
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
});