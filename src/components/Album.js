import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Button, Col, Grid, Row, Table, tbody, td, thead, th, tr } from 'react-bootstrap'
import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    currentTime: 0,
    duration: album.songs[0].duration,
    volume: 1,
    isPlaying: false,
    handleHover: album.songs.map(() => false),
    songNumber: album.songs.map(() => true)
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
    this.setState({ isPaused: false });
  }
  
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
    this.setState({ isPaused: true });
  }  

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
    let newTrackNumber = [this.state.album.songs];
    this.setState({songNumber: newTrackNumber});
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    }else if (!isSameSong) {
      this.setSong(song); 
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

  hoverIn(e, index) {
    const newDisplay = this.state.handleHover.map((disp, indexDisp) =>  indexDisp === index ? true : false )
    this.setState({ handleHover : newDisplay });
  }

  hoverOut() {
    const newDisplay = this.state.handleHover.map(() => false);
    this.setState({ handleHover : newDisplay });
  }
  
  songListButton(index) {
    if((this.state.isPlaying) && this.state.currentSong === this.state.album.songs[index]){
      return 'ion-pause';
    } else if ((!this.state.isPlaying) && this.state.currentSong === this.state.album.songs[index]) {
      return 'ion-play';
    } else {
      return 'song-number';
    } 
  }

  render() {
    return (
      <section id='album-body'>
        <Grid className='album'>
          <Row className='album-info'>
            <Col sm={4} md={4} id='album-cover-art'>
                <img src={this.state.album.albumCover} alt={`${this.state.album.title} album title`} />
            </Col>
            <Col sm={4} md={4} >
                <div className='album-details'>
                  <h1 id='album-title'>{this.state.album.title}</h1>
                  <h2 className='artist'>{this.state.album.artist}</h2>
                  <div id='release-info'>{this.state.album.releaseInfo}</div>
                  <hr />
                </div>
            </Col>
            <Col sm={4} md={4} mdPull={3} >   
              <Table responsive id='song-list'>
                  <thead>
                    <tr>
                      <th> TRACK </th>
                      <th> SONG </th>
                      <th> TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.album.songs.map( (song, index) =>
                    <tr className='song' 
                        key={index} 
                        onMouseEnter={(e) => this.hoverIn(e, index)} 
                        onMouseLeave={() => this.hoverOut()} 
                        onClick={() => this.handleSongClick(song)} >
                      <td className='song-actions'>
                        <Button>
                          <span className={this.songListButton(index)} style={{display: this.state.handleHover[index] || this.state.songNumber[index] ? 'none' : '' }}></span>
                          <span style={{display: this.state.handleHover[index] || !this.state.songNumber[index] ? 'none' : '' }}> {index+1} </span>
                          <span className='ion-play' style={{display: this.state.handleHover[index] ? '' : 'none' }}></span>
                        </Button>
                      </td>
                      <td>{song.title}</td>
                      <td>{this.formatTime(song.duration)}</td>
                    </tr>
                    )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className='controls'>
            <Col sm={4} md={4} className='playerBar'>
              <PlayerBar 
                  isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  currentTime={this.audioElement.currentTime}
                  duration={this.audioElement.duration}
                  volume={this.audioElement.volume}
                  handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={() => this.handlePrevClick()}
                  handleNextClick={() => this.handleNextClick()}
                  handleTimeChange={(e) => this.handleTimeChange(e)}
                  formatTime={(e) => this.formatTime(e)}
                  handleVolumeChange={(e) => this.handleVolumeChange(e)}
              />
            </Col>
            <Col> </Col>
          </Row>
        </Grid>
        <section className='footer'>
            <Grid>
              <Row  className='disclaimer'>
                <Col xs={6} ><h4>Designed by Bloc.io</h4> </Col>
                <Col xs={6} ><h4>Created by Stephen Coyne</h4></Col>
              </Row>
            </Grid>
          </section>  
      </section>
    );
  }
}
export default Album;