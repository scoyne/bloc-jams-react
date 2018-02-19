import React from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col, Jumbotron, Row  } from 'reactstrap';
import './Landing.css';

const Landing = () => (
    <section className="landing">
        <Jumbotron className='hero-content'>
            <h1 className="hero-title">BlocJams</h1>
            <br />
            <br />
            <br />
            <p className='lead'>Turn up the music!</p>
            <p className='lead'><i>The music you Love ... in the places you Love ... without commercials ... without boundries </i></p>
        </Jumbotron>
        <hr />
        <Container className='selling-points'>
            <Row>
                <Col xs-3>
                    <div className="point">
                        <img className='point-image' src='assets/images/cover/pexels-photo-615479.jpeg' alt='girls listening to music together' />
                        <img className='point-image point-image-top' src='assets/images/cover/pexels-photo-255437.jpeg' alt='woman playing violin' />
                        <h2 className="point-title">Choose your music</h2>
                        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
                    </div>
                </Col>
                <Col xs-3>
                    <div className="point">
                        <img className='point-image' src='assets/images/cover/pexels-photo-599571.jpeg' alt='man waiting for a train' />
                        <img className='point-image point-image-top' src='assets/images/cover/pexels-photo-89909.jpeg' alt='man lifting guitar in air in a field' />
                        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                        <p className="point-description">No arbitrary limits. No distractions.</p>
                    </div>
                </Col>
                <Col xs-3>
                    <div className="point">
                        <img className='point-image' src='assets/images/cover/pexels-photo-668196.jpeg' alt='Dude listening to music while waiting at barber' />
                        <img className='point-image point-image-top' src='assets/images/cover/pexels-photo-813940.jpeg' alt='girl listing to musis and smiling' />
                        <h2 className="point-title">Mobile enabled</h2>
                        <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
                    </div>
                </Col>
            </Row>
        </Container>
        
    </section>
);

export default Landing;
