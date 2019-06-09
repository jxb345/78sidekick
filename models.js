
const fetch = require('node-fetch');
const genres = require('./client/src/genres.js')

const findFlac = (files) => {
  const flac = /flac$/&&/^_/;
  for (let i = 0; i < files.length; i += 1) {
    if (flac.test(files[i].original)) {
      console.log('file i inside if', files[i].original);
      return files[i].original;
    }
  }
}

const fetchMetadata = (id, callback) => {
  let metadataUrl = `https://archive.org/metadata/${id}`
  fetch(metadataUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      callback(null, myJson);
    })
}

const fetchSong = (genre, year, callback) => {

let songUrl = `https://archive.org/advancedsearch.php?q=collection%3A%28georgeblood%29+AND+subject%3A%28${genre}%29+AND+YEAR%3A%28${year}%29&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=10000&page=1&output=json`
    fetch(songUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      let totalResults = myJson.response.docs.length;
      if (totalResults === 0) {
        // do something
      }
      let randomIndex = generateRandomIndex(totalResults);
      let identifier = myJson.response.docs[randomIndex].identifier ;
      fetchMetadata(identifier, (err, result) => {
        if (err) { throw err };
        let metadata = {};
        metadata.file = findFlac(result.files)
        metadata.creator = result.metadata.creator[0];
        metadata.title = result.metadata.title;
        metadata.runtime = result.metadata.runtime;
        metadata.identifier = identifier;
        metadata.genre = genre;
        metadata.year = year;
        callback(null, metadata)
      });
    });
}

const generateRandomGenre = () => {
  let randomIndex = Math.random() * (21 - 0) + 0;
  randomIndex = Math.floor(randomIndex);
  let randomGenre = genres.genres[randomIndex];
  console.log('randomgenre', randomGenre);
  return randomGenre;
}

const generateRandomIndex = (totalResults) => {
  let randomYear = Math.random() * (totalResults - 0) + 0;
  randomYear = Math.floor(randomYear);
  return randomYear;
}

const generateRandomYear = () => {
  let randomYear = Math.random() * (1960 - 1900) + 1900;
  randomYear = Math.floor(randomYear);
  return randomYear;
}

module.exports = { fetchMetadata, fetchSong, generateRandomYear, generateRandomGenre }