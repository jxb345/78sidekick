import 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
import { strictEqual } from 'assert';
import MusicPlayer from './MusicPlayer.jsx';
import MetaData from './MetaData.jsx'
import Form from './Form.jsx'
import Info from './Info.jsx'
import { callbackify } from 'util';
import ShareButtons from './ShareButtons.jsx';
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
      noYear: false,
      gettingSong: false

    }

    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);

    this.handleYearButton = this.handleYearButton.bind(this);
    this.handleGenreButton = this.handleGenreButton.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);
    this.showHideGenreForm = this.showHideGenreForm.bind(this);
    this.showHideYearForm = this.showHideYearForm.bind(this);
    this.url = this.url.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);

    this.genreButton = false;
    this.yearButton = false;
    this.userClick = false;
  }

  // POST request to '/query' endpoint in server.js; returns data and changes state
  ajaxCall() {
    $.ajax({
      url: '/query',
      method: 'POST',
      data: { data: this.state },
      success: (data) => {
        this.setState({
          year: data.year,
          genre: data.genre,
          identifier: data.identifier,
          title: data.title,
          creator: data.creator,
          runtime: data.runtime,
          audioFile: data.file,
          noYear: data.noYear,
        },
          () => {
            this.url();
            console.log('this.state', this.state);
            this.userClick = true;
            const quote = '\"';
            let quotedSong = quote + this.state.title + quote;
            this.setState({
              gettingSong: false,
              title: quotedSong
             }, () => {
              console.log('gettingSong at end of ajax()', this.state.gettingSong);
            })
          })
      }
    })
  }

  handleUserClick() {
    this.userClick = false;
  }

  // this handleChange is for use with the 'select' tag on the Form Componenet
  handleChangeGenre(e) {
    console.log('e.target.value', e.target.value);
    this.setState({ genre: e.target.value }, () => {
      console.log('this.state.genre', this.state.genre);
    });
  }

  handleChangeYear(e) {
    this.setState({ year: e.target.value }, () => {
      console.log('this.state.year', this.state.year);
    })
  }

  // checks if 'random year' or 'random genre' are clicked; if so, change state
  // NOTE: the app may not need this function if setState is invoked within showGenreForm and showYearForm functions!!!
  handleGenreButton() {
    let genreButton = this.genreButton;
    let that = this;
    return new Promise(function (resolve, reject) {
      if (genreButton) {
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
        that.setState({ yearButtonOn: true }, () => {
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
    console.log('this.state.genre', this.state.genre)
    if (this.genreButton === false || this.yearButton === false) {
      if (this.state.year === '') {
        this.yearButton = true;
      }
      if (this.state.genre === '') {
        this.genreButton = true;
      }
    }
    event.preventDefault();
    this.post();
  }

  // invokes handleRandomButtons before invoking the ajax call
  async post() {
    this.setState({ gettingSong: true}, () => {
      console.log('gettingSong at begin of post()', this.state.gettingSong);
    })
    await this.handleGenreButton()
    await this.handleYearButton()
    if (this.state.year.length === 2) {
      // let newYear = '19' + this.state.year;
      let newYear = this.state.year;
      this.setState({ year: newYear }, () => {
        this.ajaxCall();
      })
    } else {
      this.ajaxCall();
    }
  }

  // hide genre form if "random genre" switch is clicked
  showHideGenreForm() {
    const genreForm = document.getElementById("genreForm");
    const genreLabel = document.getElementsByClassName("label-genre")[0];
    if (genreForm.style.visibility === 'hidden') {
      genreForm.style.visibility = 'visible';
      genreLabel.style.color = 'lightgrey';
    } else {
      genreForm.style.visibility = 'hidden';
      genreLabel.style.color = 'black';

    }
    this.genreButton = !this.genreButton;
  }

  // hide year form if "random year" switch is clicked
  showHideYearForm() {
    const yearForm = document.getElementById("yearForm");
    const yearLabel = document.getElementsByClassName('label-year')[0];
    if (yearForm.style.visibility === 'hidden') {
      yearForm.style.visibility = 'visible';
      yearLabel.style.color = 'lightgrey'
    } else {
      yearForm.style.visibility = 'hidden';
      yearLabel.style.color = 'black'
    }
    this.yearButton = !this.yearButton;
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
      // <Router history={history}>
      <div className="grid">
        <img className="image-vinyl"
        src="vinyl-record.jpg"
        alt="Illustration of a 78"
        height="80"
        width="80"></img>
        <h1>
          sidekick 78
          <Link to="/info">
          <img
          className="image-question"
          src="info-ic.png"
          alt="Informational Icon"
          height="25"
          width="25">
          </img>
        </Link>
          <Route path="/info" component={Info} />
        </h1>
        <div className="metaData">
          <MetaData
          id={this.state.identifier}
          title={this.state.title}
          artist={this.state.creator}
          year={this.state.year}
          noYear={this.state.noYear}
          gettingSong={this.state.gettingSong}
           />
        </div>
        <div className="form-player">
          <div className="form">
            <Form
              year={this.state.year}
              genre={this.state.genre}
              handleChangeGenre={this.handleChangeGenre}
              handleChangeYear={this.handleChangeYear}
              handleSubmit={this.handleSubmit}
              showHideYearForm={this.showHideYearForm}
              showHideGenreForm={this.showHideGenreForm}
              genreButton={this.genreButton}
              yearButton={this.yearButton}
               />
          </div>
          <div className="musicPlayer">
            <MusicPlayer
              handleUserClick={this.handleUserClick}
              url={this.state.url}
              post={this.post}
              userClick={this.userClick}
              genreButtonOn={this.state.genreButtonOn}
              yearButtonOn={this.state.yearButtonOn}
            />
          </div>
        </div>
        <div className="shareButtons">
          <ShareButtons
            identifier={this.state.identifier}
            />
        </div>
      </div>

     /* </Router> */
    )
  }
}

export default App;




