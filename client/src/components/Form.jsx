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
            <input type="checkbox" id="randomYear" onClick={this.props.showHideYearForm} />
            <span></span>
            random year (1900 - 1960)
            </label>
        </div>
        {/* form to enter a year to be used in search */}
        <div id="yearForm" style={divStyle}>
          19<input className="year" type="text" name="year" value={this.props.year} onChange={this.props.handleChangeYear}></input>
        </div>
        <br></br>
        {/* switch for Random Genre */}
        <div className="checkbox checkbox-switch switch-dark">
          <label>
            <input type="checkbox" id="randomGenre" onClick={this.props.showHideGenreForm} />
            <span></span>
            random genre
            </label>
        </div>
        {/* form to enter a genre to be used in search */}
        <div id="genreForm" style={divStyle}>
          {/* <input type="text" name="genre" value={this.props.genre} onChange={this.props.handleChange}></input> */}
          <select value={this.props.genre} onChange={this.props.handleChangeGenre}>
            <option value="default" defaultValue>Pick a Genre</option>
            <option value="popular-music">Popular Music</option>
            <option value="instrumental" >Instrumental</option>
            <option value="jazz">Jazz</option>
            <option value="acoustic">Acoustic</option>
            <option value="vocal" >Vocal</option>
            <option value="latin">Latin</option>
            <option value="blues">Blues</option>
            <option value="country" >Country</option>
            <option value="polka">Polka</option>
            <option value="hillbilly">Hillbilly</option>
            <option value="dance" >dance</option>
            <option value="swing">Swing</option>
            <option value="ethnic">Ethnic</option>
            <option value="folk">Folk</option>
            <option value="novelty">Novelty</option>
            <option value="comedy">Comedy</option>
            <option value="orchestral" >Orchestral</option>
            <option value="hawaiian">Hawaiian</option>
            <option value="film">Film</option>
            <option value="christmas">Christmas</option>
            <option value="gospel" >Gospel</option>
            <option value="cowboy">Cowboy</option>
          </select>
        </div>
        <button>PLAY</button>
      </form>
    )
  }
}

export default Form