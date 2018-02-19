import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col, Jumbotron, Row  } from 'reactstrap';

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
              <Card>
                <Link to={`/album/${album.slug}`} key={index} >
                  <CardImg src={album.albumCover} alt={album.title} />
                  <CardBody>
                    <CardTitle>{album.title}</CardTitle>
                    <CardSubtitle>{album.artist}</CardSubtitle>
                    <CardText>{album.songs.length}</CardText>
                  </CardBody>
                </Link>
              </Card>
            )
          }
          </section>
        );
    }
}

export default Library;
