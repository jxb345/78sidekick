import React from 'react';


class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      year: '',
      genre: '',
    }
  }


  render() {
    const divStyle = {
      display: 'block'
    }
    return (
      <form onSubmit={this.props.handleSubmit}>
       {/* switch for Random Year */}
        <div className="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomYear" onClick={this.props.showHideYearForm}/>
            <span></span>
            random year
            </label>
        </div>
        {/* form to enter a year to be used in search */}
        <div id="yearForm" style={divStyle}>
          <input className="year" type="text" name="year" value={this.props.year} onChange={this.props.handleChange}></input>
        </div>
        <br></br>
        {/* switch for Random Genre */}
        <div className="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomGenre" onClick={this.props.showHideGenreForm}/>
            <span></span>
            random genre
            </label>
        </div>
        {/* form to enter a genre to be used in search */}
        <div id="genreForm" style={divStyle}>
          <input type="text" name="genre" value={this.props.genre} onChange={this.props.handleChange}></input>
        </div>
        <button>PLAY</button>
      </form>
    )
  }
}

export default Form