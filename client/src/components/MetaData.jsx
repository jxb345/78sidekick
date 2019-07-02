import React from 'react';

class MetaData extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    let detailsPage = `https://archive.org/details/${this.props.id}`

    if (this.props.title === '' & this.props.artist === '') {
      return <div>Select a Year and Genre or Just Click 'PLAY'!</div>
    } else {
      return (
        // displays fetched metadata for a given song
        <div>
          <a href={detailsPage} target="_blank">
          <span>"{this.props.title}" by</span>
         <span> {this.props.artist}</span>
         </a>
        </div>
      )
    }
  }
}

export default MetaData
