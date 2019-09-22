import 'react';

class Info extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <h3>What</h3>
            <p>
              sideKick 78 streams
            </p>

          <h3>How</h3>
            <p>
              sideKick 78 uses the <a href="https://archive.org/">Internet Archive</a> API to search the <a href="https://archive.org/details/georgeblood">George Blood collection</a> of digitized 78s.<br></br>  This digitization effort was generously funded by the Kahle-Austin Foundation. <br></br>The collection contains over 100,000 items. <br></br>Enjoy!';
            </p>
          <h3>Who</h3>
          <p>
            sideKick 78 is by Jesse Bell with contributions from Scott.
          </p>


        </div>

      </div>
    )
  }
}

export default Info;