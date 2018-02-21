import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col, Jumbotron, Row  } from 'reactstrap';
import './Album.css';



class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 50,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ diration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }   

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       this.play();
     }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min((this.state.album.songs.length -1), currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(seconds) {
    const timeInSeconds = Math.floor(seconds);
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    var timeDisplay = minutes + ' : ';
    if(remainingSeconds < 10) {
      timeDisplay += 0;
    }
    if(isNaN(seconds)) {
      return ' - : -- '
    }
    timeDisplay += remainingSeconds;
    return timeDisplay;
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }
  


  render() {
    return (
      <Container className='album'>
        <Row className='album-info'>
          <Col id='album-cover-art'>
              <img src={this.state.album.albumCover} alt={`${this.state.album.title} album title`} />
          </Col>
          <Col className='pull-right'>
              <div className="album-details">
                <h1 id="album-title">{this.state.album.title}</h1>
                <h2 className="artist">{this.state.album.artist}</h2>
                <div id="release-info">{this.state.album.releaseInfo}</div>
              </div> 
          </Col>
        </Row>
        <Row>
        <Col></Col>
          <Col>
            <table id="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>  
              <tbody>
                {    
                  this.state.album.songs.map( (song, index) =>
                    <tr className="song">
                      <td className='song-actions'>
                        <button id="play-pause" onClick={this.props.handleSongClick} >
                          <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                        </button>
                      </td> 
                      <td><span className='song-number'> {index +1}</span> </td>
                      <td className='song-item-title'> {song.title}</td>
                      <td className='song-item-duration'> {this.formatTime(song.duration)} </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </Col>
        </Row>
          <PlayerBar 
              isPlaying={this.state.isPlaying}
              currentSong={this.state.currentSong}
              currentTime={this.audioElement.currentTime}
              duration={this.audioElement.duration}
              handleSongClick={() => this.handleSongClick(this.state.currentSong)}
              handlePrevClick={() => this.handlePrevClick()}
              handleNextClick={() => this.handleNextClick()}
              handleTimeChange={(e) => this.handleTimeChange(e)}
              formatTime={(e) => this.formatTime(e)}
              handleVolumeChange={(e) => this.handleVolumeChange(e)}
          />
      </Container>
    );
  }
}
export default Album;