import 'react';

class Info extends React.Component {
  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this);

  }

  goBack() {
    window.history.back();
  }

  render() {
    return (
      <div>
        <div className="grid">
        <div>
        <h1>
           78 sideKick
        </h1>
          <h3 className="how-what-who">What</h3>
            <p className="info-text">
              <strong>YEAR</strong>
              <ul>
                <li>
                  Click the "Shuffle Year" toggle switch to listen to songs from 1900 - 1960.
                </li>
                <li>
                  Enter two digits to listen to songs from a given year. <br/>
                  >> (i.e., type "40" to listen to songs from "1940")
                </li>
              </ul>
              <strong>GENRE</strong>
              <ul>
                <li>
                  Click the "Shuffle Genre" toggle switch to listen to all available genres.
                </li>
                <li>
                  Select a genre from the dropdown list. <br/>
                  >> (i.e., "Jazz")
                </li>
              </ul>
              <i>NOTE: </i>Genres may not be available for every year, so when a particular genre
              does not have a corresponding year, then [Date Unknown] will appear.
              <br/>
              <br/>
              <strong>DOWNLOAD FLAC AUDIO FILE</strong>
                <ul>
                  <li><i>Chrome</i>: Click the three vertical dots on the right side of the audio player.</li>
                  <li><i>Firefox</i>: Right-click on the audio player and select 'Save Audio As..' </li>
                  <li><i>Safari</i>: Right-click on the audio player and select 'Download Audio As...'</li>
                </ul>
          </p>

          <h3 className="how-what-who">How</h3>
            <p className="info-text">
              78 sideKick uses the <a href="https://archive.org/" target="_blank">Internet Archive</a> APIs to search 160,000+ digitzied 78s
              from the <a href="https://archive.org/details/georgeblood" target="_blank">George Blood collection</a>. This digitization effort was generously
              funded by the Kahle-Austin Foundation. <br></br>
            </p>
          <h3 className="how-what-who">Who</h3>
          <p className="info-text">
          78 sideKick was built by <a href="https://jessebell.dev" target="_blank">Jesse Bell</a> who immensely enjoys
            listening to art through headphones, and also with generous contributions
            from <a href="https://github.com/auramix">Scott Josephson</a>.
          </p>
          <div>
          <input className="return-button" type="button" onClick={() => {this.goBack();}} value="RETURN" />
        </div>
        </div>
        <br/>

          </div>

      </div>
    )
  }
}

export default Info;