import React from 'react';

class MetaData extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    let detailsPage = `https://archive.org/details/${this.props.id}`
    return (
      <div>
        <span>TITLE: {this.props.title}</span>
        <br></br>
       <span>ARTIST: {this.props.artist}</span>
      </div>
    )
  }
}

export default MetaData
