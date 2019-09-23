import 'react';

class Info extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="how-what-who">What</h3>
            <p className="info-text">
              You have some options for which music you'd like to listen to:
              YEAR
              <ul>
                <li>Enter the two digits to listen to songs from a given year (i.e., type "40" to listen to songs from "1940")</li>
                <li>Click the "Shuffle Year" toggle switch to listen to songs from 1900 - 1960</li>
              </ul>
              GENRE
              <ul>
                <li>Select a genre from the dropdown list (i.e., "Jazz").</li>
                <li>Click the "Shuffle Genre" toggle switch to listen to all available genres.</li>
              </ul>
              <strong>NOTE:</strong> Genres may not be available for every year, so when a particular genre does not have a corresponding year, "[Date Unknown]" will apear.
          </p>

          <h3 className="how-what-who">How</h3>
            <p className="info-text">
              sideKick 78 uses the <a href="https://archive.org/">Internet Archive</a> API to search the <a href="https://archive.org/details/georgeblood">George Blood collection</a>
              of digitized 78s.<br></br>  This digitization effort was generously funded by the Kahle-Austin Foundation. <br></br>
              The collection contains over 100,000 items. <br></br>Enjoy!';
            </p>
          <h3 className="how-what-who">Who</h3>
          <p className="info-text">
            sideKick 78 is by Jesse Bell with contributions from <a href="https://github.com/auramix">Scott Josephson</a>.
          </p>


        </div>

      </div>
    )
  }
}

export default Info;