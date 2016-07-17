import React from 'react';


export default class PersonalLife extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-3 mainpart">
              <div className="panel panel-default lifepanel">
                <div className="panel-body">
                  <font className="lifeheader"><center>
                    MY LIFE
                  </center></font>
                  <div className="media">
                    <div className="media-body">
                      <center>I love traveling with my family. Here are some pictures about my life and family.</center>
                    </div>
                    <div className="media-bottom">
                      PICS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
