import React, { Component } from 'react';

class UserCard extends Component {
  render() {
    return (
      <div className={this.props.activeIndex === this.props.id ?'user-card active':'user-card'} onClick={(e) => this.props.handleClick(this.props.id, e)}>
        <img src='user.png' />{this.props.name}
      </div>
    );
  }  
};
export default UserCard;