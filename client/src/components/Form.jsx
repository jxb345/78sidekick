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
        <div class="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomYear" onClick={this.props.showHideYearForm}/>
            <span></span>
            Random Year
            </label>
        </div>
        {/* form to enter a year to be used in search */}
        <div id="yearForm" style={divStyle}>
          <input className="year" type="text" name="year" value={this.props.year} onChange={this.props.handleChange}></input>
        </div>
        <br></br>
        <br></br>
        {/* switch for Random Genre */}
        <div class="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomGenre" onClick={this.props.showHideGenreForm}/>
            <span></span>
            Random Genre
            </label>
        </div>
        {/* form to enter a genre to be used in search */}
        <div id="genreForm" style={divStyle}>
          <input type="text" name="genre" value={this.props.genre} onChange={this.props.handleChange}></input>
        </div>
        <br></br>
        <br></br>
        <button>PLAY</button>
      </form>
    )
  }
}

export default Form