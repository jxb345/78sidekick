import React from 'react';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)

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
        <audio controls ref={this.audioPlayer} onEnded={()=> { this.props.post()}}>
        <source src={this.props.url} crossOrigin="anonymous"></source>
      </audio>
      <button onClick={() => {this.props.post()}}>SKIP</button>
      </div>
    )
  }
}

export default MusicPlayer
