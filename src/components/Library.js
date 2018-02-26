import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Col, Grid, Row  } from 'react-bootstrap';
import './Library.css';

class Library extends Component {
    constructor(props) {
      super(props);
      this.state = { albums: albumData };
    }


    render() {
      return (
          <section className='library'>
          {
            this.state.albums.map( (album, index) =>
              <Link to={`/album/${album.slug}`} key={index} >
                <Grid>
                  <Row>
                    <Col xs={6}>
                      <img src={album.albumCover} alt={album.title} />  
                    </Col>
                    <Col xs={6}>
                      <div className='album-title'>{album.title}</div>
                      <div className='album-artist'>{album.artist}</div>
                      <div className='album-length'>number of tracks: {album.songs.length}</div>
                      <hr />
                    </Col>
                  </Row>
                </Grid>
              </Link>
            )
          }
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

export default Library;
