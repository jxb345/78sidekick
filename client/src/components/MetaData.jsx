import React from 'react';

class MetaData extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    const spanStyle = {
      fontSize: 15,
    }
    let detailsPage = `https://archive.org/details/${this.props.id}`
    let year;
    if (`${this.props.year}` !== '') {
      year = `(19` +`${this.props.year}` + `)`;
    }
    if (this.props.title === '' && this.props.artist === '') {
      return <div>
        </div>
    } else {
      return (
        // displays fetched metadata for a given song
        <div>
          <a href={detailsPage} target="_blank">
          <span>"{this.props.title}"</span>
          <br></br>
         <span style={spanStyle} >{this.props.artist}</span>
         <br></br>
         <span style={spanStyle}>{year}</span>
         </a>
        </div>
      )
    }
  }
}

export default MetaData
