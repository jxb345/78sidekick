import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();
import About from './About.jsx';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)

    // provides DOM access to the 'audio' element
    this.audioPlayer = React.createRef();

    this.playTrack = this.playTrack.bind(this);
  }

  async playTrack() {
    this.props.handleUserClick();
    await this.audioPlayer.current.load()
    this.audioPlayer.current.play()
  }

  componentDidUpdate() {
    // need a conditional statement to see if user has click either of the switches so that the musicplayer will
    if (this.props.userClick) {
      this.playTrack();
    }

  }

  render() {
    return (
      <div>
        {/* audio player */}
        <audio controls style={{margin: "0 auto", display: "block"}} ref={this.audioPlayer} onEnded={() => { this.props.post() }}>
          <source src={this.props.url} crossOrigin="anonymous"></source>
        </audio>
        {/* make another POST request if user doesn't like song */}

        <div style={{marginLeft: "70px"}} >
          <button className="skip-button" onClick={() => { this.props.post(); this.audioPlayer.current.pause(); }}>SKIP</button>
        </div>
        <p className="about"></p>
        <p className="about-text"></p>
      </div>
    )
  }
}

export default MusicPlayer
