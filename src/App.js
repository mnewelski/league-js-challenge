import React, { Component } from 'react';
import API from './api.js';
import UserCard from './Components/UserCard';
import AlbumCard from './Components/AlbumCard';
import PhotoCard from './Components/PhotoCard';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { users: [], albums: [], photos: [], activeUser: null, activeAlbum: null };
  };

  componentDidMount() {
    let that = this;

    API.get('users').then(res => {
        this.setState({users: res.data})
      });

    this.setAlbums = function(id,event) {
        if(that.state.activeUser !== id) {
          that.setState({activeUser: id,activeAlbum: null});
          API.get('albums?userId=' + id).then(res => {
              that.setState({photos: []});
              that.setState({albums: res.data});
              console.log(that.state.activeUser);
            });  
        }
        else {
          that.setState({albums: [], photos:[], activeUser: null, activeAlbum: null});
        }
        
    }

    this.setPhotos = function(id,event) {
      if(that.state.activeAlbum !== id) {
        that.setState({activeAlbum: id});
        API.get('photos?albumId=' + id).then(res => {
            that.setState({photos: res.data})
            console.log(res.data);
          });
      }
      else {
        that.setState({photos:[], activeAlbum: null});
      }
      
    }
  }
  render() {
    return (
      <div className="App">
        <UsersList users={this.state.users} activeUser={this.state.activeUser} onClickHandler={this.setAlbums}/>
        <AlbumsList albums={this.state.albums} activeAlbum={this.state.activeAlbum} doRender={this.state.activeUser} onClickHandler={this.setPhotos}/>
        <PhotosList photos={this.state.photos} doRender={this.state.activeAlbum}/>
      </div>
    );
  }
}


const UsersList = (props) => {
  return(
    <div className='users-list'>
    <h1>Users</h1>
      {props.users.map(user => <UserCard handleClick={props.onClickHandler} activeIndex={props.activeUser} key={user.id} {...user} />)}
    </div>
  );
};

const AlbumsList = (props) => {
  if(props.doRender) {
    return (
      <div className='albums-list'>
      <h1>Albums</h1>
        {props.albums.map(album => <AlbumCard handleClick={props.onClickHandler} activeIndex={props.activeAlbum} key={album.id} {...album} />)}
      </div>
    );
  }
  return(<div></div>);
}

const PhotosList = (props) => {
  if(props.doRender) {
    return (
      <div className='photos-list'>
        {props.photos.map(photo => <PhotoCard key={photo.id} {...photo} />)}
      </div>
    );
  }
  return(<div></div>);
}


export default App;
