import React from 'react';
import {Link} from 'react-router';

export default class Topnav extends React.Component {


  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container">
          <div className="navbar-header">
            <div className="dropdown pull-right">
              <button className="navbar-toggle collapsed dropbutton" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MENU  <span className="glyphicon glyphicon-menu-hamburger toggletag"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dLabel">
                <li className="Pinfo">
                  <Link to={"/personalinfo"}><button type="button" className="btn btn-default buttons pull-left">Profile</button></Link>
                </li>
                <li className="Timel">
                  <Link to={"/timeline"}><button type="button" className="btn btn-default buttons">TimeLine</button></Link>
                </li>
                <li className="Com">
                  <Link to={"/comment"}><button type="button" className="btn btn-default buttons">Comments</button></Link>
                </li>
                <li className="resume">
                  <button type="button" className="btn btn-default buttons">Resume</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              <Link to={"/personalinfo"}><button type="button" className="btn btn-default mainbutton">
                  Zhongce Ji
                </button></Link>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <Link to={"/personalinfo"}><button type="button" className="btn btn-default buttons">Profile</button></Link>
              <Link to={"/timeline"}><button type="button" className="btn btn-default buttons">TimeLine</button></Link>
              <Link to={"/comment"}><button type="button" className="btn btn-default buttons">Comment</button></Link>
              <button type="button" className="btn btn-default buttons">Resume</button>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

}
