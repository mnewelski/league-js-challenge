import React, { Component } from 'react';

class AlbumCard extends Component {
  render() {
    return (
      <div className={this.props.activeIndex === this.props.id ?'album-card active':'album-card'} onClick={(e) => this.props.handleClick(this.props.id, e)}>
        <img src='album.png' />{this.props.title}
      </div>
    );
  }  
};
export default AlbumCard;