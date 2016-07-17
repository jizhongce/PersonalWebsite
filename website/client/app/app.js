import React from 'react';
import ReactDOM from 'react-dom';
import Leftnav from './component/leftnav.js';
import Topnav from './component/topnav.js';
import Timeline from './component/timeline.js';
import Commentpage from './component/commentpage.js';
import PersonalInfo from './component/personalinfo.js';
import PersonalLife from './component/personallife.js';
import PersonalProj from './component/personalproj.js';
import ErrorBanner from './component/errorbanner.js';
import Footer from './component/footer.js';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';



class CommentPage extends React.Component {
  render() {
    return (
      <div>
        <Commentpage />
      </div>
    );
  }
}
class PersonalInfoPage extends React.Component {
  render() {
    return (
      <div>
        <Leftnav />
        <PersonalInfo />
      </div>
    );
  }
}
class PersonalLifePage extends React.Component {
  render() {
    return (
      <div>
        <Leftnav />
        <PersonalLife />
      </div>
    );
  }
}
class PersonalProjPage extends React.Component {
  render() {
    return (
      <div>
        <Leftnav />
        <PersonalProj />
      </div>
    );
  }
}

class TimeLinePage extends React.Component {
  render() {
    return (
      <div>
        <Timeline />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Topnav />
          <div className="row zeromargin">
            <ErrorBanner />
          </div>
        {this.props.children}
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={PersonalInfoPage} />
      <Route path="personalinfo" component={PersonalInfoPage} />
      <Route path="personallife" component={PersonalLifePage} />
      <Route path="personalproj" component={PersonalProjPage} />
      <Route path="timeline" component={TimeLinePage} />
      <Route path="comment" component={CommentPage} />
    </Route>
  </Router>
),document.getElementById('JZCWEB'));
