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
      gettingSong: false,
      foundIds: [],
      yearGenre: '',

    }

    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);

    this.handleYearButton = this.handleYearButton.bind(this);
    this.handleGenreButton = this.handleGenreButton.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);
    this.metadataPost = this.metadataPost.bind(this);
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

    // idea:
      // when a request is made for a genre and year, the server.js file also send back all Ids from that last search
      // these ids are saved in an array(?) in State (excluding the Id of the currently playing song)
      // before the next song is fetch, IF the genre and year reamin the same, the app will grab the flac for the first id in the arr
      // * this process will continue (the app grab the flac file for the next Id in the arr) as long as the year/genre remain unchanged

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
          foundIds: data.foundIds
        },
          () => {
            this.url();
            console.log('this.state.foundIds', this.state.foundIds);
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
    console.log('this.state.year', this.state.year)
    console.log('this.state.genre', this.state.genre);
    this.post();
  }

  metadataPost () {
    let songIndex = 0;
    let neededSongInfo;
    neededSongInfo = this.state.foundIds[songIndex].identifier;

      this.setState ( { yearGenre: yearGenreConcat }, () => {
        $.ajax ( {
          url: '/metadata',
          method: 'POST',
          data: { data: neededSongInfo },
          success: () => {
            console.log('success metadata post')
          }
        })
      })
  }

  // invokes handleRandomButtons before invoking the ajax call
  async post() {
    if (this.state.year !== '' && this.state.genre !== '') {
      let yearGenreConcat = this.state.year + this.state.genre;
      if (yearGenreConcat === this.state.yearGenre) {
        this.metadataPost();
      } else {
        this.setState({ gettingSong: true }, () => {
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
        <div>
          <img className="image-vinyl"
            src="vinyl-record.jpg"
            alt="Illustration of a 78"
            height="70"
            width="70">
          </img>
          <h1>
            78 sideKick
            <Link to="/info">
              <img
                className="image-question"
                src="info-ic.png"
                alt="Informational Icon"
                height="22"
                width="22">
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
      </div>

      /* </Router> */
    )
  }
}

export default App;




