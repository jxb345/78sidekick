import React from 'react';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)

    // provides DOM access to the 'audio' element
    this.audioPlayer = React.createRef();
  }

  componentDidUpdate() {
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
      {/* <button onClick={() => {this.props.post()}}>SKIP</button> */}
      </div>
    )
  }
}

export default MusicPlayer
