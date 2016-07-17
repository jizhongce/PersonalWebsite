import React from 'react';

export default class Reply extends React.Component {


  render() {
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          {this.props.data.author.FirstName}.{this.props.data.author.LastName} : {this.props.data.contents}
        </div>
      </div>
    )
  }
}
