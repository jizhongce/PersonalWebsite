import React from 'react';
import {hideElement,missingValue} from '../../util';


export default class CommentEntry extends React.Component {

  //initial the constructor
    constructor(props) {
       super(props);
       this.state = {
        inputflag2: true,
        choiceflag: true,
        inputflag1: true,
        buttonflagshow: false,
        buttonflaghide: true,
        firstname_value: '',
        lastname_value: '',
        email_value: '',
        comments_value: '',
        SecondEmail_value: '',
        SecondComments_value: '',
        firstname_flag: false,
        lastname_flag: false,
        email_flag: false,
        comments_flag: false,
        SecondEmail_flag: false,
        SecondComments_flag: false

       };
     }

     handlefirst(e){
       e.preventDefault();
       this.setState({
         inputflag1: false,
         inputflag2: true
       });
     }

     handlesecond(e){
       e.preventDefault();
       this.setState({
         inputflag1: true,
         inputflag2: false
       });
     }

    handlePost(e) {
      e.preventDefault();
      this.setState({
        choiceflag: false,
        inputflag: true,
        buttonflagshow: true,
        buttonflaghide: false
      });
    }

    handleCancle(e){
      e.preventDefault();
      this.setState({
        inputflag1: true,
        inputflag2: true,
        choiceflag: true,
        buttonflagshow: false,
        buttonflaghide: true,
        firstname_flag: false,
        lastname_flag: false,
        email_flag: false,
        comments_flag: false,
        SecondEmail_flag: false,
        SecondComments_flag: false
      });
    }

    missvalue(value){
      if (value == '') {
        return true;
      }
      else {
        return false;
      }
    }

    handlefirstNameChange(e){
      e.preventDefault();
      this.setState({
        firstname_value: e.target.value,
        firstname_flag: this.missvalue(e.target.value)
      });
    }

    handlelastNameChange(e){
      e.preventDefault();
      this.setState({
        lastname_value: e.target.value,
        lastname_flag: this.missvalue(e.target.value)
      });
    }

    handleemailChange(e){
      e.preventDefault();
      this.setState({
        email_value: e.target.value,
        email_flag: this.missvalue(e.target.value)
      });
    }

    handlecommentsChange(e){
      e.preventDefault();
      this.setState({
        comments_value: e.target.value,
        comments_flag: this.missvalue(e.target.value)
      });
    }

    handleSecondCommentsChange(e){
      e.preventDefault();
      this.setState({
        SecondComments_value: e.target.value,
        SecondComments_flag: this.missvalue(e.target.value)
      });
    }

    handleSecondEmailChange(e){
      e.preventDefault();
      this.setState({
        SecondEmail_value: e.target.value,
        SecondEmail_flag: this.missvalue(e.target.value)
      });
    }

    handlePostComment(e){
      e.preventDefault();
      var firstname = this.state.firstname_value;
      var lastname = this.state.lastname_value;
      var email = this.state.email_value;
      var contents = this.state.comments_value;
      if (!this.missvalue(firstname)&&!this.missvalue(lastname)&&!this.missvalue(email)&&!this.missvalue(contents)) {
        this.props.onPost(firstname, lastname, email, contents);
        this.setState({
          inputflag1: true,
          inputflag2: true,
          choiceflag: true,
          buttonflagshow: false,
          buttonflaghide: true,
          firstname_value: '',
          lastname_value: '',
          email_value: '',
          comments_value: '',
          firstname_flag: false,
          lastname_flag: false,
          email_flag: false,
          comments_flag: false,
          SecondEmail_flag: false,
          SecondComments_flag: false
        });
      }
      else {
        alert("There is a missing field need to be filled !");
        this.setState({
          firstname_flag: this.missvalue(firstname),
          lastname_flag: this.missvalue(lastname),
          email_flag: this.missvalue(email),
          comments_flag: this.missvalue(contents)
        });
      }
    }

    handleSecondPostComment(e){
      e.preventDefault();
      var email = this.state.SecondEmail_value;
      var contents = this.state.SecondComments_value;
      if (!this.missvalue(email)&&!this.missvalue(contents)) {
        this.props.onSecondPost(email, contents);
        this.setState({
          inputflag1: true,
          inputflag2: true,
          choiceflag: true,
          buttonflagshow: false,
          buttonflaghide: true,
          SecondEmail_value: '',
          SecondComments_value: '',
          firstname_flag: false,
          lastname_flag: false,
          email_flag: false,
          comments_flag: false,
          SecondEmail_flag: false,
          SecondComments_flag: false
        });
      }
      else {
        alert("There is a missing field need to be filled !");
        this.setState({
          SecondEmail_flag: this.missvalue(email),
          SecondComments_flag: this.missvalue(contents)
        });
      }
    }

    handleClearComment(e){
      e.preventDefault();
      this.setState({
        firstname_value: '',
        lastname_value: '',
        email_value: '',
        comments_value: '',
        firstname_flag: false,
        lastname_flag: false,
        email_flag: false,
        comments_flag: false,
        SecondEmail_flag: false,
        SecondComments_flag: false
      });
    }

    handleSecondClearComment(e){
      e.preventDefault();
      this.setState({
        SecondEmail_value: '',
        SecondComments_value: '',
        firstname_flag: false,
        lastname_flag: false,
        email_flag: false,
        comments_flag: false,
        SecondEmail_flag: false,
        SecondComments_flag: false
      });
    }


  render() {
    return (
      <div>
        <center>
          <button type="button" className={"btn btn-default commentpost " + hideElement(this.state.buttonflagshow)} onClick={(e) => this.handlePost(e)}>Have Something To Say?</button>
          <button type="button" className={"btn btn-default commentpost " + hideElement(this.state.buttonflaghide)} onClick={(e) => this.handleCancle(e)}>Have already said it!</button>
        </center>
        <div className={"replychoice " + hideElement(this.state.choiceflag)}>
            <button type="button" className="btn btn-default firsttime" onClick={(e) => this.handlefirst(e)}>First Time</button>
            <button type="button" className="btn btn-default secondtime" onClick={(e) => this.handlesecond(e)}>Posted Before</button>
        </div>
        <ul className={"media-list postcommentinput " + hideElement(this.state.inputflag1)}>
          <li className="media">
            <div className="media-body">
              <div className="row">
                <div className={"col-md-6 firstnamefield " + missingValue(this.state.firstname_flag)}>
                  First Name: <input type="text" className="form-control" placeholder="First Name eg. Zhongce" value ={this.state.firstname_value} onChange={(e) => this.handlefirstNameChange(e)}/>
                </div>
                <div className={"col-md-6 lastnamefield " + missingValue(this.state.lastname_flag)}>
                  Last Name: <input type="text" className="form-control" placeholder="Last Name eg. Ji" value ={this.state.lastname_value} onChange={(e) => this.handlelastNameChange(e)}/>
                </div>
              </div>
              <div className="row">
                <div className={"col-md-12 emailaddress " + missingValue(this.state.email_flag)}>
                  Email: <input type="text" className="form-control" placeholder="Email Address eg. xxxxxxx@xxxx.com" value ={this.state.email_value} onChange={(e) => this.handleemailChange(e)}/>
                </div>
              </div>
              <div className="row">
                <div className={"col-md-12 commentsfield " + missingValue(this.state.comments_flag)}>
                  Comments:  <textarea className="form-control" rows="2" placeholder="Say Something About Me....." value ={this.state.comments_value} onChange={(e) => this.handlecommentsChange(e)}></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-default submitbutton pull-right" onClick={(e) => this.handlePostComment(e)}>Submit</button>
                  <button type="button" className="btn btn-default clearbutton pull-left" onClick={(e) => this.handleClearComment(e)}>Clear</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul className={"media-list " + hideElement(this.state.inputflag2)}>
          <div className="media-body">
            <div className="row">
              <div className={"col-md-12 emailaddress " + missingValue(this.state.SecondEmail_flag)}>
                Email: <input type="text" className="form-control" placeholder="Email Address eg. xxxxxxx@xxxx.com" value ={this.state.SecondEmail_value} onChange={(e) => this.handleSecondEmailChange(e)} />
              </div>
            </div>
            <div className="row">
              <div className={"col-md-12 replyfield " + missingValue(this.state.SecondComments_flag)}>
                Comments:  <textarea className="form-control" rows="2" placeholder="Say Something About Me....." value ={this.state.SecondComments_value} onChange={(e) => this.handleSecondCommentsChange(e)}></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button type="button" className="btn btn-default submitbutton pull-right" onClick={(e) => this.handleSecondPostComment(e)}>Submit</button>
                <button type="button" className="btn btn-default clearbutton pull-left" onClick={(e) => this.handleSecondClearComment(e)}>Cancel</button>
              </div>
            </div>
          </div>
        </ul>
      </div>
    )
  }
}
