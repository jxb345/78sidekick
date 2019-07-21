import React from 'react';

class MetaData extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    let detailsPage = `https://archive.org/details/${this.props.id}`

    if (this.props.title === '' && this.props.artist === '') {
      return <div>
        Stream music from <br></br>the Internet Archive's vast 78s collection.
        </div>
    } else {
      return (
        // displays fetched metadata for a given song
        <div>
          <a href={detailsPage} target="_blank">
          <span>"{this.props.title}"</span>
          <br></br>
         <span>{this.props.artist}</span>
         </a>
        </div>
      )
    }
  }
}

export default MetaData
