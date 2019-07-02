import 'react';
import { strictEqual } from 'assert';
import MusicPlayer from './MusicPlayer.jsx';
import MetaData from './MetaData.jsx'
import Form from './Form.jsx'
import { callbackify } from 'util';
const $ = require('jquery');
const genres = require('../genres.js');

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      year: '',
      genre: '',
      identifier: '',  // 78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a
      title: '',  // You Are My Sunshine
      creator: '',  // Paul Rice
      runtime: '',
      audioFile: '', // _78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a_01_3.8-ct_eq.flac
      url: '', // https://archive.org/download/78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a/_78_you-are-my-sunshine_paul-ric...sticker-rice-brothers-gang_gbia0000125a_01_3.8-ct_eq.flac
      genreButtonOn: false,
      yearButtonOn: false,
    }

    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleRandomButtons = this.handleRandomButtons.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);
    this.showHideGenreForm = this.showHideGenreForm.bind(this);
    this.showHideYearForm = this.showHideYearForm.bind(this);
    this.url = this.url.bind(this);

    this.genreButton = false;
    this.yearButton = false;
  }


  // POST request to  '/query' endpoint in server.js; returns data and changes state
  ajaxCall() {
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
            console.log('this.state', this.state);
          })
      }
    })
  }

  // updates state while user fills out 'genre' or 'year' form
  // this handleChange is for use with the 'input' tag on the Form Component
    // handleChange(event) {
    //   let input = event.target.name;
    //   let value = event.target.value
    //   console.log('input', input)
    //   console.log('value', value)
    //   this.setState({
    //     [input]: value
    //   })
    // }

  // this handleChange is for use with the 'select' tag on the Form Componenet
  handleChangeGenre(e) {
    this.setState({genre: e.target.value}, () => {
      console.log('this.state.genre', this.state.genre);
    });
  }

  handleChangeYear (e) {
    this.setState( { year: e.target.value}, () => {
      console.log('this.state.year', this.state.year);
    })
  }

  // checks if 'random year' or 'random genre' are click; if so, change state
  handleRandomButtons(callback) {
    if (this.genreButton) {
      this.setState({ genreButtonOn: this.state.genreButtonOn }, () => {
        console.log('this.state.genreButtonOn', this.state.genreButtonOn);
        // placement of this callback() invocation seems wrong
        // callback()
      })
    }
    if (this.yearButton) {
      console.log('handlebuttons detects YEAR button is ON!')
      this.setState({ yearButtonOn: this.state.yearButtonOn }, () => {
        console.log('this.state.yearButtonOn', this.state.yearButtonOn);

      })
    } else {
      let newYear = '19' + this.state.year;
      this.setState( { year: newYear }, () => {
        console.log('this.state.year', this.state.year)
      })
    }
    console.log('inside of handleRadmon ()', this.state)
    callback(null);
  }

  // when user clicks the 'play'/submit button
  handleSubmit(event) {
    event.preventDefault();
      this.post();
  }

  // invokes handleRandomButtons before invoking the ajax call
  post() {
    this.handleRandomButtons((err) => {
      if (err) { throw err; }

      this.ajaxCall();
    });
  }

  // hide genre form if "random genre" switch is clicked
  showHideGenreForm() {
    const genreForm = document.getElementById("genreForm");
    genreForm.style.display = randomGenre.checked ? "none" : "block";
    this.genreButton = !this.genreButton;
    console.log(this.genreButton, 'gB')

  }

  // hide year form if "random year" switch is clicked
  showHideYearForm() {
    const yearForm = document.getElementById("yearForm");
    yearForm.style.display = randomYear.checked ? "none" : "block";
    this.yearButton = !this.yearButton;
    console.log(this.yearButton, 'yB');
  }

  // concatenates id and audioFile to form complete URL of song file
  url() {
    let id = this.state.identifier;
    let audioFile = this.state.audioFile;
    let fullUrl = `https://archive.org/download/${id}/${audioFile}`
    console.log('fullurl', fullUrl)
    this.setState({ url: fullUrl })
  }

  render() {
    return (
      <div>
        <img src="vinyl-record.jpg" alt="78 Record Plyaer" height="120" width="120"></img>
        <h1>78 sideKick</h1>
        <div className="metaData">
            <MetaData id={this.state.identifier} title={this.state.title} artist={this.state.creator} />
          </div>
        <div className="form-player">
          <div className="form">
            <Form
            year={this.state.year} genre={this.state.genre} handleChangeGenre={this.handleChangeGenre}
            handleChangeYear={this.handleChangeYear} handleSubmit={this.handleSubmit} showHideYearForm={this.showHideYearForm}
            showHideGenreForm={this.showHideGenreForm} />
          </div>
        <div className="musicPlayer">
            <MusicPlayer url={this.state.url} post={this.post} />
          </div>
        </div>

      </div>
    )
  }
}

export default App;