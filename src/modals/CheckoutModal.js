import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// CheckoutModal is used as the form for when checking out the cart.

class CheckoutModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            return;
        }
        this.props.checkout();
        window.alert("Success! Congratulations!")
        this.props.close();
        window.location.href = '/';
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={true}
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                name="first-name"
                                // defaultValue={this.props.pet ? this.props.pet.name : ''}
                                type="text"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                name="last-name"
                                // defaultValue={this.props.pet ? this.props.pet.age : ''}
                                type="text"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                name="address"
                                // defaultValue={this.props.pet ? this.props.pet.type : ''}
                                type="text"
                                required
                            />
                            {/* <Form.Control.Feedback type="invalid">Type is required!</Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                name="phone-number"
                                // defaultValue={this.props.pet ? this.props.pet.breed : ''}
                                type="text"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                name="card-number"
                                // defaultValue={this.props.pet ? this.props.pet.description : ''}
                                type="text"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Expiry Date</Form.Label>
                            <Form.Control
                                name="card-expiry-date"
                                // defaultValue={this.props.pet ? this.props.pet.url : ''}
                                type="text"
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name="price"
                                // defaultValue={this.props.pet ? this.props.pet.price : ''}
                                type="text"
                                required
                            />
                        </Form.Group> */}
                        <Button
                            variant="primary"
                            type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={this.props.close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CheckoutModal;
