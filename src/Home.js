import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }
    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };

    render() {
        return (
            <div className="Home">
                {this.props.pets.length > 0 &&
                    <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                alt="First Slide"
                                src={this.props.pets[0].url}
                            />
                            <Carousel.Caption>
                                <h3>{this.props.pets[0].name}</h3>
                                <p>{this.props.pets[0].breed}</p>
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
                                <p>{this.props.pets[1].breed}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                }
            </div>
        );
    }

}

export default Home;
