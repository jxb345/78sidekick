import React from 'react';

class MetaData extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    let detailsPage = `https://archive.org/details/${this.props.id}`
    return (
      // displays fetched metadata for a given song
      <div>
        <span>"{this.props.title}" by</span>
       <span> {this.props.artist}</span>
      </div>
    )
  }
}

export default MetaData
