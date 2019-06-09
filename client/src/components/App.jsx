import 'react';
import { strictEqual } from 'assert';
import MusicPlayer from './MusicPlayer.jsx';
import MetaData from './MetaData.jsx'
import Form from './Form.jsx'
const $ = require('jquery');
const genres = require('../genres.js');

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      year: '',
      genre: '',
      identifier: '78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a',
      title: 'You Are My Sunshine',
      creator: 'Paul Rice',
      runtime: '',
      audioFile: '_78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a_01_3.8-ct_eq.flac',
      url: 'https://archive.org/download/78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a/_78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a_01_3.8-ct_eq.flac',
      genreButtonOn: false,
      yearButtonOn: false,
    }

    // remove
    // this.convertToMilli = this.convertToMilli.bind(this);
    this.genreButton = false;
    this.yearButton = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleRandomButtons = this.handleRandomButtons.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);
    // this.removeRandom = this.removeRandom.bind(this);
    this.showHideGenreForm = this.showHideGenreForm.bind(this);
    this.showHideYearForm = this.showHideYearForm.bind(this);
    this.url = this.url.bind(this);
  }

  handleChange(event) {
    let input = event.target.name;
    let value = event.target.value
    console.log('input', input)
    console.log('value', value)
    this.setState({
      [input]: value
    })
  }

/*
function no longer needed
  calculation to milliseconds is not correct
  convertToMilli(runtime) {
    runtime = runtime.split(':');
    let min = parseFloat(runtime[1]);
    let sec = parseFloat(runtime[2]);
    let milli = (min * 60) + (sec);
    milli *= 1000;
    return milli;
  }
 */

 handleRandomButtons() {
   if (genreButton) {
       this.setState ( { genreButtonOn: !this.state.genreButtonOn }, () => {
      console.log('this.state.genreButtonOn', this.state.genreButtonOn);
    })
   }
   if (this.yearButton) {
    this.setState ( { yearButtonOn: !this.state.yearButtonOn }, () => {
      console.log('this.state.yearButtonOn', this.state.yearButtonOn);
    })
   }
 }

 handleSubmit(event) {
  event.preventDefault();
  this.post();
}

  post() {
    this.handleRandomButtons
    $.ajax({
      url: '/query',
      method: 'POST',
      data: { data: this.state },
      success: (data) => {
        console.log('data', data)
        this.setState({
          year: data.year,
          genre: data.genre,
          identifier: data.identifier,
          title: data.title,
          creator: data.creator,
          runtime: data.runtime,
          audioFile: data.file,
        },
          () => {
            this.url();
            // this.removeRandom();
            console.log('this.state', this.state);
            // let runtime = this.convertToMilli(this.state.runtime);
            // setTimeout(() => { this.post()
            // },
            // runtime
            // );
          })
      }
    })
  }

  // removeRandom() {
  //   this.setState( { year: ''});
  //   this.setState( { genre: ''}, () => {
  //     console.log('removeRandom state', this.state)
  //   });
  // }

  showHideGenreForm() {
    const genreForm = document.getElementById("genreForm");
    genreForm.style.display = randomGenre.checked ? "none" : "block";
    this.genreButton = !this.genreButton;

  }

  showHideYearForm() {
    const yearForm = document.getElementById("yearForm");
    yearForm.style.display = randomYear.checked ? "none" : "block";
    this.yearButton = !this.yearButton;
  }

  url() {
    let id = this.state.identifier;
    let audioFile = this.state.audioFile;
    console.log('id', id)
    console.log('aF', audioFile);
    let fullUrl = `https://archive.org/download/${id}/${audioFile}`
    console.log('fullurl', fullUrl)
    this.setState( {url: fullUrl})
  }

  render() {
    return (
      <div>
        <Form year={this.state.year} genre={this.state.genre} handleChange={this.handleChange} handleSubmit={this.handleSubmit} showHideYearForm={this.showHideYearForm} showHideGenreForm={this.showHideGenreForm} />
        <br></br>
        <MetaData id={this.state.identifier} title={this.state.title} artist={this.state.creator} />
        <MusicPlayer url={this.state.url} post={this.post}/>
      </div>
    )
  }
}

export default App;