import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            petTypes: null,
            supplyTypes: null
        };
    }
    // used to send the user to the pets page with the type they want to see
    handlePetIconClick = (type) => {
        window.location.href = '/pets?type=' + type;
    };

    handleSupplyIconClick = (type) => {
        window.location.href = '/petsupplies?type=' + type;
    };

    handleCarouselClick = (id) => {
        window.location.href = '/pets?id=' + id;
    };
    // carousel index handler
    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };

    // ES6 style fetch for getting distinct types
    async componentDidMount() {
        await fetch('http://localhost:3000/api/petTypes')
            .then(response => response.json())
            .then(data => {
                this.setState({ petTypes: data });
            })
            .catch(error => console.log(error))

        await fetch('http://localhost:3000/api/supplyTypes')
            .then(response => response.json())
            .then(data => {
                this.setState({ supplyTypes: data });
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="Container maxvp">
                <div className="large">
                    <h1 className="center centerText">About Us</h1>
                    <p style={{ textAlign: "left" }}>
                        Welcome to Pet Universe, where we believe that every pet is a star! Our mission is to provide the best pet products and supplies that will help your furry friends shine!
                    </p>
                    <p style={{ textAlign: "left" }}>
                        We believe that pets are family, and we treat every customer like one of our own. Our knowledgeable and friendly staff are always ready to help you find the perfect products for your pet. We are committed to providing exceptional customer service and making sure that you and your pet have a stellar experience shopping with us.
                    </p>
                    <p style={{ textAlign: "left" }}>
                        So join us on a journey to the Pet Universe, where every pet is a star and the possibilities are endless!
                    </p>
                </div>
                <div className="maxvp flexCenter whitebg">
                    <div className="centerText large">
                        <h1 className="center centerText whitebg">Featured Pets</h1>
                        {this.props.pets && this.props.pets.length > 0 &&
                            <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                                <Carousel.Item>
                                    <a key={this.props.pets[0]._id} href="#" onClick={() => this.handleCarouselClick(this.props.pets[0]._id)}>
                                        <img
                                            className="carouselImg"
                                            alt="First Slide"
                                            src={this.props.pets[0].url}
                                        />
                                    </a>
                                    <Carousel.Caption className="blackTextBorder">
                                        <h1>{this.props.pets[0].name}</h1>
                                        <p>{this.props.pets[0].breed}</p>
                                    </Carousel.Caption>

                                </Carousel.Item>
                                <Carousel.Item>
                                    <a key={this.props.pets[1]._id} href="#" onClick={() => this.handleCarouselClick(this.props.pets[1]._id)}>
                                        <img
                                            className="carouselImg"
                                            alt="Second Slide"
                                            src={this.props.pets[1].url}
                                        />
                                    </a >
                                    <Carousel.Caption className="blackTextBorder">
                                        <h1>{this.props.pets[1].name}</h1>
                                        <p>{this.props.pets[1].breed}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a key={this.props.pets[2]._id} href="#" onClick={() => this.handleCarouselClick(this.props.pets[2]._id)}>
                                        <img
                                            className="carouselImg"
                                            alt="Second Slide"
                                            src={this.props.pets[2].url}
                                        />
                                    </a>
                                    <Carousel.Caption className="blackTextBorder">
                                        <h1>{this.props.pets[2].name}</h1>
                                        <p>{this.props.pets[2].breed}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        }
                    </div>
                </div>
                <div>
                </div>
                <div className="large" >
                    <h1 className="centerText">Shop By Pet</h1>
                    <div className="row centerText" >
                        {this.state.petTypes && this.state.petTypes.map((type) => {
                            return (
                                <div className="col centerText" >
                                    <a key={type} href="#" onClick={() => this.handlePetIconClick(type)}>
                                        <img
                                            src={require(`./images/${type}.jpg`).default}
                                        ></img>
                                    </a>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="large">
                    <h1 className="centerText">Shop By Product</h1>
                    <div className="row centerText" >
                        {this.state.supplyTypes && this.state.supplyTypes.map((type) => {
                            return (
                                <div className="col centerText">
                                    <a key={type} href="#" onClick={() => this.handleSupplyIconClick(type)}>
                                        <img
                                            src={require(`./images/${type}.jpg`).default}
                                        ></img>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
