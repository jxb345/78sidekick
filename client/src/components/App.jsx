import 'react';
import { strictEqual } from 'assert';
import MusicPlayer from './MusicPlayer.jsx';
import MetaData from './MetaData.jsx'
import Form from './Form.jsx'
import { callbackify } from 'util';
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      year: '',
      genre: '',
      identifier: '',
      title: '',
      creator: '',
      runtime: '',
      audioFile: '',
      url: '',
      genreButtonOn: false,
      yearButtonOn: false,

    }

    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);

    // may not need these functions
    this.handleYearButton = this.handleYearButton.bind(this);
    this.handleGenreButton = this.handleGenreButton.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);
    this.showHideGenreForm = this.showHideGenreForm.bind(this);
    this.showHideYearForm = this.showHideYearForm.bind(this);
    this.url = this.url.bind(this);

    // this is only needed if handleRandomButtons function is kept
    this.genreButton = false;
    this.yearButton = false;

    this.userClick = false;
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
            this.userClick = false;
            console.log('this.state', this.state);
          })
      }
    })
  }


  // this handleChange is for use with the 'select' tag on the Form Componenet
  handleChangeGenre(e) {
    this.setState({ genre: e.target.value }, () => {
      console.log('this.state.genre', this.state.genre);
    });
  }

  handleChangeYear(e) {
    this.setState({ year: e.target.value }, () => {
      console.log('this.state.year', this.state.year);
    })
  }

  handleRandomButtons() {

  }

  // checks if 'random year' or 'random genre' are clicked; if so, change state
  // NOTE: the app may not need this function if setState is invoked within showGenreForm and showYearForm functions!!!
  handleGenreButton() {
    let genreButton = this.genreButton;
    let that = this;
    return new Promise(function (resolve, reject) {
      if (genreButton) {
        console.log('handlebuttons detects Genre button is ON!')
        that.setState({ genreButtonOn: true }, () => {
          resolve();
        })
      } else {
        that.setState({ genreButtonOn: false }, () => {
          resolve();
        })
      }
    })
  }

  handleYearButton() {
    let yearButton = this.yearButton;
    let that = this;
    return new Promise(function (resolve, reject) {
      if (yearButton) {
        console.log('handlebuttons detects YEAR button is ON!')
        that.setState({ yearButtonOn: true }, () => {
          console.log('two - this.state.yearButtonOn', that.state.yearButtonOn);
          resolve()
        })
      } else {
        that.setState({ yearButtonOn: false }, () => {
          resolve()
        })
      }
    })
  }

  // when user clicks the 'play'/submit button
  handleSubmit(event) {
    event.preventDefault();
    this.post();
  }

  // invokes handleRandomButtons before invoking the ajax call
  async post() {
    this.userClick = true;
    // made not need this function
    await this.handleGenreButton()
    await this.handleYearButton()
    if (this.state.year.length === 2) {
      // let newYear = '19' + this.state.year;
      let newYear = this.state.year;
      this.setState({ year: newYear }, () => {
        console.log('three - this.state.year')
        this.ajaxCall();
      })
    } else {
      console.log('three - this.state.....', this.state);
      this.ajaxCall();
    }
  }

  // hide genre form if "random genre" switch is clicked
  showHideGenreForm() {
    const genreForm = document.getElementById("genreForm");
    genreForm.style.display = randomGenre.checked ? "none" : "block";

    // this is only needed if handleRandomButtons function is kept
    this.genreButton = !this.genreButton;
    console.log('this.genreButton', this.genreButton)

  }

  // hide year form if "random year" switch is clicked
  showHideYearForm() {
    const yearForm = document.getElementById("yearForm");
    yearForm.style.display = randomYear.checked ? "none" : "block";
    // this is only needed if handleRandomButtons function is kept
    this.yearButton = !this.yearButton;
    console.log('this.yearButton', this.yearButton)
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
            <MusicPlayer
              url={this.state.url} post={this.post} userClick={this.userClick}
              genreButtonOn={this.state.genreButtonOn} yearButtonOn={this.state.yearButtonOn}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default App;