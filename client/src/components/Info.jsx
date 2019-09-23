import 'react';

class Info extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
        <h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          sidekick 78
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
              <strong>*</strong> Genres may not be available for every year, so when a particular genre <br/>
              &nbsp;&nbsp;&nbsp;does not have a corresponding year, "[Date Unknown]" will appear.
          </p>

          <h3 className="how-what-who">How</h3>
            <p className="info-text">
              sideKick 78 uses the <a href="https://archive.org/">Internet Archive</a> APIs to search 100,000+ digitzied 78s <br/>
              from the <a href="https://archive.org/details/georgeblood">George Blood collection</a>. This digitization effort was generously <br/>
              funded by the Kahle-Austin Foundation. <br></br>
            </p>
          <h3 className="how-what-who">Who</h3>
          <p className="info-text">
            sideKick 78 was built by a passionate Jesse Bell who immensely enjoys art <br/>
            through headphones, and also generous contributions from <a href="https://github.com/auramix">Scott Josephson</a>.
          </p>


        </div>

      </div>
    )
  }
}

export default Info;