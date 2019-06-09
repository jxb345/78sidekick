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
        <div class="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomYear" onClick={this.props.showHideYearForm}/>
            <span></span>
            Random Year
            </label>
        </div>
        <div id="yearForm" style={divStyle}>
          <input type="text" name="year" value={this.props.year} onChange={this.props.handleChange}></input>
        </div>
        <br></br>
        <br></br>
        <div class="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomGenre" onClick={this.props.showHideGenreForm}/>
            <span></span>
            Random Genre
            </label>
        </div>
        <div id="genreForm" style={divStyle}>
          <input type="text" name="genre" value={this.props.genre} onChange={this.props.handleChange}></input>
        </div>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    )
  }
}

export default Form