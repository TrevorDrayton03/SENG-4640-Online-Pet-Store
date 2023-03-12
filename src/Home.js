import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Home extends Component {

    render() {
        return (
            <div className="Home">
                {this.props.pets.length > 0 &&
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                alt="First Slide"
                                src={this.props.pets[0].url}
                            />
                            <Carousel.Caption>
                                <h3>{this.props.pets[0].name}</h3>
                                <p>{this.props.pets[0].description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                alt="Second Slide"
                                src={this.props.pets[1].url}
                            />
                            <Carousel.Caption>
                                <h3>{this.props.pets[1].name}</h3>
                                <p>{this.props.pets[1].description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                }
            </div>
        );
    }

}

export default Home;
