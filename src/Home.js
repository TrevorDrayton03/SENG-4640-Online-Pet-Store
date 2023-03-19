import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            petTypes: null,
        };
    }

    // carousel index handler
    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };

    // ES6 style fetch for distinct pet types
    async componentDidMount() {
        await fetch('http://localhost:3000/api/types')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ petTypes: data });
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="Container large">
                <div className="large">
                    <h3 className="center centerText">About Us</h3>
                    <p>
                        Welcome to Pet Universe, where we believe that every pet is a star in its own universe! Our mission is to provide the best pet products and supplies that will help your furry friends shine like the brightest stars in the galaxy.
                    </p>
                    <p>
                        At Pet Universe, we understand that every pet is unique and special. That's why we offer a wide range of products that cater to different types of pets and their needs. Whether your pet is a shining star, a quirky comet, or a loyal planet, we have everything you need to keep them happy and healthy.
                    </p>
                    <p>
                        At Pet Universe, we believe that pets are family, and we treat every customer like one of our own. Our knowledgeable and friendly staff are always ready to help you find the perfect products for your pet. We are committed to providing exceptional customer service and making sure that you and your pet have a stellar experience shopping with us.
                    </p>
                    <p>
                        So join us on a journey to the Pet Universe, where every pet is a star and the possibilities are endless!
                    </p>
                    <hr></hr>
                </div>
                <div className="centerText">
                    <h3 className="center centerText">Some Good Boys and Girls</h3>
                    {this.props.pets && this.props.pets.length > 0 &&
                        <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    alt="First Slide"
                                    src={this.props.pets[0].url}
                                />
                                <Carousel.Caption className="blackTextBorder">
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
                                <Carousel.Caption className="blackTextBorder">
                                    <h3>{this.props.pets[1].name}</h3>
                                    <p>{this.props.pets[1].breed}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    alt="Second Slide"
                                    src={this.props.pets[2].url}
                                />
                                <Carousel.Caption className="blackTextBorder">
                                    <h3>{this.props.pets[2].name}</h3>
                                    <p>{this.props.pets[2].breed}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    }
                </div>
                <div>
                    <hr className="large"></hr>
                </div>
                <div className="large">
                    <h3 className="centerText">Pets</h3>
                    <div className="row">
                        {this.state.petTypes && this.state.petTypes.map((type) => {
                            return (
                                <div className="col">
                                    <a key={type} href="#" onClick={null}>
                                        <img src={require("./images/" + type + ".jpg")}></img>
                                    </a>
                                </div>
                            )
                        })}
                        <hr></hr>
                    </div>
                </div>
                <div className="large">
                    <h3 className="centerText">Supplies</h3>
                    <hr></hr>
                </div>
            </div>
        );
    }
}

export default Home;
