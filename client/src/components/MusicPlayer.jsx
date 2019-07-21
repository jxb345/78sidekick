import React from 'react';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)

    // possiblly use this state as conidtional in componentDidUpdate
    // this.state = {
    //   yearButtonOn: false,
    //   genreButtonOn: false
    // }

    // provides DOM access to the 'audio' element
    this.audioPlayer = React.createRef();

    this.playTrack = this.playTrack.bind(this);
  }

  async playTrack () {
    console.log('componentDidUpdate invoked.');
    await this.audioPlayer.current.pause()
    await this.audioPlayer.current.load()
    await this.audioPlayer.current.play()
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
        <audio controls ref={this.audioPlayer} onEnded={()=> { this.props.post()}}>
        <source src={this.props.url} crossOrigin="anonymous"></source>
      </audio>
      {/* make another POST request if user doesn't like song */}
      <div>
      <button className="skip-button" onClick={() => {this.props.post()}}>SKIP</button>
      </div>
      </div>
    )
  }
}

export default MusicPlayer
