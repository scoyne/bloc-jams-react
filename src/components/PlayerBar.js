import React, { Component } from 'react'; 
import { Nav, Navbar, NavItem, } from 'react-bootstrap'
 
class PlayerBar extends Component {
  render() {
    return (
        <section className="player-bar">
            <section id="time-control">                                                                    
                <Navbar id='buttons'>
                    <Nav>
                        <NavItem eventKey={1} id="previous" onClick={this.props.handlePrevClick} >
                            <span className="ion-skip-backward"></span>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={2} className='current-time'> {this.props.formatTime(this.props.currentTime)}
                        </NavItem>
                        <NavItem eventKey={3} id="play-pause" onClick={this.props.handleSongClick} >
                            <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                        </NavItem>
                        <NavItem eventKey={4}>
                            <input
                                type='range'
                                className='seek-bar'
                                value={(this.props.currentTime / this.props.duration) || 0}
                                max='1'
                                min='0'
                                step='0.01'
                                onChange={this.props.handleTimeChange}
                            />
                        </NavItem>
                        <NavItem eventKey ={5} className='total-time'> {this.props.formatTime(this.props.duration)}
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={6} id="next" onClick={this.props.handleNextClick} >
                            <span className="ion-skip-forward"></span>
                        </NavItem>
                    </Nav>
                </Navbar>
            </section>
            <section id="volume-control">
                <div className="icon ion-volume-low"></div>
                <input 
                    type='range'
                    className='seek-bar'
                    value={(this.props.volume)}
                    max='1'
                    min='0'
                    step='.01'
                    onChange={this.props.handleVolumeChange}
                />
                <div className="icon ion-volume-high"></div>
            </section> 
        </section>
    );
  }
}

export default PlayerBar;