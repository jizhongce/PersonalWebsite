import React from 'react';
import Reply from './reply.js';
import {hideElement,unixTimeToString,missingValue} from '../../util';



export default class Comment extends React.Component {

  //initial the constructor
    constructor(props) {
       super(props);
       this.state = {
        replychoiceflag: true,
        newuserflag: true,
        replybuttonflag: false,
        hidebuttonflag: true,
        seconduserflag: true,
        replyFname_value: '',
        replyLname_value: '',
        replyFirstEmail_value: '',
        replyFirstComment_value: '',
        replySecondEmail_value: '',
        replySecondComment_value: '',
        replyFname_flag: false,
        replyLname_flag: false,
        replyFirstEmail_flag: false,
        replyFirstComment_flag: false,
        replySecondEmail_flag: false,
        replySecondComment_flag: false
       };
     }

     //Reply button
     handleReply(e) {
       e.preventDefault();
       this.setState({
         replychoiceflag:false,
         replybuttonflag: true,
         hidebuttonflag: false
       });
     }

     //Hide button
     handleHide(e) {
       e.preventDefault();
       this.setState({
         replychoiceflag:true,
         replybuttonflag: false,
         hidebuttonflag: true,
         newuserflag:true,
         seconduserflag: true
       });
     }

     handlefirstuser(e) {
       e.preventDefault();
       this.setState({
         newuserflag:false,
         seconduserflag: true
       });
     }

     handleseconduser(e) {
       e.preventDefault();
       this.setState({
         newuserflag:true,
         seconduserflag: false
       });
     }

     handlecancel(e){
       e.preventDefault();
       this.setState({
         replychoiceflag:false,
         replybuttonflag: true,
         hidebuttonflag: false,
         newuserflag:true,
         seconduserflag: true,
         replyFname_value: '',
         replyLname_value: '',
         replyFirstEmail_value: '',
         replyFirstComment_value: '',
         replySecondEmail_value: '',
         replySecondComment_value: '',
         replyFname_flag: false,
         replyLname_flag: false,
         replyFirstEmail_flag: false,
         replyFirstComment_flag: false,
         replySecondEmail_flag: false,
         replySecondComment_flag: false
       });
     }

     //From here is the function which is used by the reply and reply cancel
     //button and also the reply field
     missvalue(value){
       if (value == '') {
         return true;
       }
       else {
         return false;
       }
     }

     handleReplyFname(e){
       e.preventDefault();
       this.setState({
         replyFname_value: e.target.value,
         replyFname_flag: this.missvalue(e.target.value)
       });
     }

     handleReplyLname(e){
       e.preventDefault();
       this.setState({
         replyLname_value: e.target.value,
         replyLname_flag: this.missvalue(e.target.value)
       });
     }

     handleReplyFemail(e){
       e.preventDefault();
       this.setState({
         replyFirstEmail_value: e.target.value,
         replyFirstEmail_flag: this.missvalue(e.target.value)
       });
     }

     handleReplyFcomment(e){
       e.preventDefault();
       this.setState({
         replyFirstComment_value: e.target.value,
         replyFirstComment_flag: this.missvalue(e.target.value)
       });
     }

     handleFirstReply(e){
       e.preventDefault();
       var firstname = this.state.replyFname_value;
       var lastname = this.state.replyLname_value;
       var email = this.state.replyFirstEmail_value;
       var content = this.state.replyFirstComment_value;
       if (!this.missvalue(firstname)&&!this.missvalue(lastname)&&!this.missvalue(email)&&!this.missvalue(content)) {
         this.props.onReply(this.props.data._id, firstname, lastname, email, content);
         this.setState({
           replychoiceflag: true,
           newuserflag: true,
           replybuttonflag: false,
           hidebuttonflag: true,
           seconduserflag: true,
           replyFname_value: '',
           replyLname_value: '',
           replyFirstEmail_value: '',
           replyFirstComment_value: '',
           replyFname_flag: false,
           replyLname_flag: false,
           replyFirstEmail_flag: false,
           replyFirstComment_flag: false,
           replySecondEmail_flag: false,
           replySecondComment_flag: false
         });
       }
       else {
         alert("There is a missing field need to be filled !");
         this.setState({
           replyFname_flag: this.missvalue(firstname),
           replyLname_flag: this.missvalue(lastname),
           replyFirstEmail_flag: this.missvalue(email),
           replyFirstComment_flag: this.missvalue(content)
         });
       }
     }

     handleReplySemail(e){
       e.preventDefault();
       this.setState({
         replySecondEmail_value: e.target.value,
         replySecondEmail_flag: this.missvalue(e.target.value)
       });
     }

     handleReplyScomment(e){
       e.preventDefault();
       this.setState({
         replySecondComment_value: e.target.value,
         replySecondComment_flag: this.missvalue(e.target.value)
       });
     }

     handleSecondReply(e){
       e.preventDefault();
       var email = this.state.replySecondEmail_value;
       var content = this.state.replySecondComment_value;
       if (!this.missvalue(email)&&!this.missvalue(content)) {
         this.props.onSecondReply(this.props.data._id, email, content);
         this.setState({
           replychoiceflag: true,
           newuserflag: true,
           replybuttonflag: false,
           hidebuttonflag: true,
           seconduserflag: true,
           replySecondEmail_value: '',
           replySecondComment_value: '',
           replyFname_flag: false,
           replyLname_flag: false,
           replyFirstEmail_flag: false,
           replyFirstComment_flag: false,
           replySecondEmail_flag: false,
           replySecondComment_flag: false
         });
       }
       else {
         alert("There is a missing field need to be filled !");
         this.setState({
           replySecondEmail_flag: this.missvalue(email),
           replySecondComment_flag: this.missvalue(content)
         });
       }
     }




    render() {
      return (
        <div>
          <div className="media-left media-top">
            PIC
          </div>
          <div className="media-body">
            {this.props.data.author.FirstName}.{this.props.data.author.LastName} : {this.props.data.contents}
            <br /><a className={"replybuttons " + hideElement(this.state.replybuttonflag)} onClick={(e) => this.handleReply(e)}>Reply</a><a className={"replybuttons " + hideElement(this.state.hidebuttonflag)} onClick={(e) => this.handleHide(e)}>Hide</a> · {unixTimeToString(this.props.data.postDate)}
              <div className={"replychoice " + hideElement(this.state.replychoiceflag)}>
                  <button type="button" className="btn btn-default firstuser" onClick={(e) => this.handlefirstuser(e)}>First Time</button>
                  <button type="button" className="btn btn-default seconduser" onClick={(e) => this.handleseconduser(e)}>Posted Before</button>
              </div>
              <ul className={"media-list " + hideElement(this.state.newuserflag)}>
                <div className="media-body">
                  <div className="row">
                    <div className={"col-md-6 firstnamefield " + missingValue(this.state.replyFname_flag)}>
                      First Name: <input type="text" className="form-control" placeholder="First Name..." value={this.state.replyFname_value} onChange={(e) => this.handleReplyFname(e)} />
                    </div>
                    <div className={"col-md-6 lastnamefield " + missingValue(this.state.replyLname_flag)}>
                      Last Name: <input type="text" className="form-control" placeholder="Last Name..." value={this.state.replyLname_value} onChange={(e) => this.handleReplyLname(e)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className={"col-md-12 emailaddress " + missingValue(this.state.replyFirstEmail_flag)}>
                      Email: <input type="text" className="form-control" placeholder="Email..." value={this.state.replyFirstEmail_value} onChange={(e) => this.handleReplyFemail(e)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className={"col-md-12 replyfield " + missingValue(this.state.replyFirstComment_flag)}>
                      Comments:  <input type="text" className="form-control" placeholder="Write a comment..." value={this.state.replyFirstComment_value} onChange={(e) => this.handleReplyFcomment(e)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-default submitbutton pull-right" onClick={(e) => this.handleFirstReply(e)}>Reply</button>
                      <button type="button" className="btn btn-default clearbutton pull-left" onClick={(e) => this.handlecancel(e)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </ul>
              <ul className={"media-list " + hideElement(this.state.seconduserflag)}>
                <div className="media-body">
                  <div className="row">
                    <div className={"col-md-12 emailaddress " + missingValue(this.state.replySecondEmail_flag)}>
                      Email: <input type="text" className="form-control" placeholder="Email..." value={this.state.replySecondEmail_value} onChange={(e) => this.handleReplySemail(e)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className={"col-md-12 replyfield " + missingValue(this.state.replySecondComment_flag)}>
                      Comments:  <input type="text" className="form-control" placeholder="Write a comment..." value={this.state.replySecondComment_value} onChange={(e) => this.handleReplyScomment(e)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-default submitbutton pull-right" onClick={(e) => this.handleSecondReply(e)}>Reply</button>
                      <button type="button" className="btn btn-default clearbutton pull-left" onClick={(e) => this.handlecancel(e)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="replys">
                {this.props.data.replys.map((reply, i) => {
                      return (
                        <Reply key={i} data={reply} />
                      );
                    })}
              </div>
          </div>
       </div>
     )
   }
 }
