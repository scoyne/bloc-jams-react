import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';


class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album
    };

    const songList = this.state.album.songs;
      for(let i = 0; i < songList.length; i++) {
        let trackNumber = i + 1;
        return trackNumber;
      }

  }
  
  render() {
    return (
      <section className='album'>
         <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} />
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div> 
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>  
           <tbody>
             {
              this.state.album.songs.map( (songs, index) =>
                <tr className='album-view-song-item'>  
                  <td className='song-item-number'> {this.state.album.songs.songList} </td>
                  <td className='song-item-title'> {songs.title}</td>
                  <td className='song-item-duration'> {songs.duration} </td>
                </tr>
              )
             }
           </tbody>
         </table>
      </section>
    );
  }
}
export default Album;