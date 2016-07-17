import React from 'react';


export default class Timeline extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="timeline">
              <li>
                <div className="timeline-badge"><i className="glyphicon glyphicon-check"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">First time line</h4>
                </div>
                <div className="timeline-image">
                  <img className="T1" src="../img/book-need.jpg"></img>
                </div>
                <div className="timeline-body"><p>This is the Discriptions for the first timeline</p></div>
              </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-badge"><i className="glyphicon glyphicon-check"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Second time line</h4>
                </div>
                <div className="timeline-image">
                  <img className="T1" src="../img/book-need.jpg"></img>
                </div>
                <div className="timeline-body"><p>This is the Discriptions for the first timeline</p></div>
              </div>
              </li>
              <li>
                <div className="timeline-badge"><i className="glyphicon glyphicon-check"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">Second time line</h4>
                </div>
                <div className="timeline-image">
                  <img className="T1" src="../img/book-need.jpg"></img>
                </div>
                <div className="timeline-body"><p>This is the Discriptions for the first timeline</p></div>
              </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

}
