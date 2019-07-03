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
  }

  componentDidUpdate() {
    // need a conditional statement to see if user has click either of the switches so that the musicplayer will

      console.log('cDU');
      this.audioPlayer.current.pause();
      this.audioPlayer.current.load();
      this.audioPlayer.current.play();


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
