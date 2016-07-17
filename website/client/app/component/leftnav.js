import React from 'react';
import {Link} from 'react-router';


export default class Leftnav extends React.Component {

  render() {
    return (
      <div className="col-md-2 pull-left leftnavbar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 Pinfo">
              <Link to={"/personalinfo"}><button type="button" className="btn btn-default leftbuttons">Personal Information</button></Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 Lifeinfo">
              <Link to={"/personallife"}><button type="button" className="btn btn-default leftbuttons">Personal life</button></Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 Lifeproj">
              <Link to={"/personalproj"}><button type="button" className="btn btn-default leftbuttons">Personal project</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
