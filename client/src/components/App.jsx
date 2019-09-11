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
        },
          () => {
            this.url();
            console.log('this.state', this.state);
            this.userClick = true;
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
    // made not need this function
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

    let fbShareUrl = `https://facebook.com/sharer/sharer.php?u=https://archive.org/details/${this.state.identifier}`;
    let twitterShareUrl = `https://twitter.com/intent/tweet/?text=Check%20out%20this%20song%20from%20Internet%20Archive's%20digitized%2078s%20collection:&amp;url=https://archive.org/details/${this.state.identifier}`;
    console.log('fb', fbShareUrl)
    return (
      <div>
        <img
        src="vinyl-record.jpg"
        alt="78 Record Player"
        height="120"
        width="120"></img>
        <h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          78 sideKick
          </h1>
        <div className="metaData">
          <MetaData
          id={this.state.identifier}
          title={this.state.title}
          artist={this.state.creator}
          year={this.state.year}
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
        <div>
<a class="resp-sharing-button__link" href={fbShareUrl} target="_blank" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
    </div>
  </div>
</a>

<a class="resp-sharing-button__link" href={twitterShareUrl} target="_blank" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
    </div>
  </div>
</a>

<a class="resp-sharing-button__link" href="https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;caption=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;content=http%3A%2F%2Fsharingbuttons.io&amp;canonicalUrl=http%3A%2F%2Fsharingbuttons.io&amp;shareSource=tumblr_share_button" target="_blank" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"/></svg>
    </div>
  </div>
</a>

<a class="resp-sharing-button__link" href="mailto:?subject=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;body=http%3A%2F%2Fsharingbuttons.io" target="_self" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg>
    </div>
  </div>
</a>



        </div>

      </div>
    )
  }
}

export default App;





