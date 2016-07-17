import React from 'react';


export default class PersonalInfo extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-3 mainpart">
              <div className="panel panel-default profilepanel">
                <div className="panel-body">
                  <font className="profileheader"><center>
                    ME
                  </center></font>
                  <div className="media">
                    <div className="media-left media-top">
                      PIC
                    </div>
                    <div className="media-body">
                      I was born in a small town, Wen Zhou, a beautiful city in south of China. I am not good at studying when I was in my elementary school, Wenzhou PuXieShi elementary school, which is a great elementray school in Wenzhou. However when I entered my Middle school, WenZhou Experimenttal Middle School, I began to be interested in Math and Science. After Graduating from middle school I entered a famous High shcool in Zhejiang province, Wenzhou No.2 Senior High School. And now I am in University of Massachusetts Amherst. My prime major is Computer Science and I am also double mayjor in Actuarial Math. I am passionate in programming and computing. I am good at communicating with others and have many experience in team project. I believe what I learned from the university can help me success in the future career.
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
