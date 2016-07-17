import React from 'react';
import Comment from './commentpage/comment.js'
import CommentThread from './commentpage/commentthread.js'
import {getallcomments,NewUserPostComment,SecondTimePostComment,FirstReplyComment,SecondReplyComment} from '../server.js'


export default class Commentpage extends React.Component {

    //initial the constructor
    constructor(props) {
       super(props);
       this.state = {
        comments : []
       };
     }

     handleCommentPost(firstname, lastname, email, contents){
       NewUserPostComment(lastname, firstname, email, contents, (comment)=>{
         this.setState({comments : comment});
       });
     }

     handleSecondCommentPost(email, contents){
       SecondTimePostComment(email, contents, (comment)=>{
         this.setState({comments : comment});
       });
     }

     handleFreply(commentid,firstname,lastname,email,contents){
       FirstReplyComment(commentid,firstname,lastname,email,contents, (comment)=>{
         this.setState({comments : comment});
       });
     }

     handleSreply(commentid,email,contents){
       SecondReplyComment(commentid,email,contents, (comment)=>{
         this.setState({comments : comment});
       });
     }


  refresh() {
      getallcomments((comment)=> {
        this.setState({comments : comment});
      });
  }

  componentDidMount() {
    this.refresh();
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 commenttread">
            <div className="panel panel-default commentthread">
              <div className="panel-body">
                <font className="commentheader"><center>
                  LET'S TALK ABOUT ME
                </center></font>
              <CommentThread onPost={(firstname, lastname, email, contents) => this.handleCommentPost(firstname, lastname, email, contents)} onSecondPost={(email,contents) => this.handleSecondCommentPost(email,contents)}>
                  {this.state.comments.map((comment, i) => {
                        return (
                          <Comment key={i} data={comment} onReply={(commentid,firstname,lastname,email,contents) => this.handleFreply(commentid,firstname,lastname,email,contents)} onSecondReply={(commentid,email,contents) => this.handleSreply(commentid,email,contents)} />
                        );
                      })}
                </CommentThread>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
