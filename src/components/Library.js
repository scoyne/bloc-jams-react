import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col, Jumbotron, Row  } from 'reactstrap';
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
                <Container>
                  <Row>
                    <Col xs-2>
                      <img src={album.albumCover} alt={album.title} />  
                    </Col>
                    <Col xs-2>
                      <div className='album-title'>{album.title}</div>
                      <div className='album-artist'>{album.artist}</div>
                      <div className='album-length'>number of tracks: {album.songs.length}</div>
                      <hr />
                    </Col>
                  </Row>
                </Container>
              </Link>
            )
          }
          </section>
        );
    }
}

export default Library;
