import React, { Component } from 'react';

class PhotoCard extends Component {
  render() {
    return (
      <div className='photo-card'>
        <div><img src={this.props.thumbnailUrl} alt={this.props.title} /></div>
        <div>{this.props.title}</div>
      </div>
    );
  }  
};

export default PhotoCard;