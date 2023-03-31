import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

/**
* CheckoutModal.js is used as the form for checking out the cart.
* @example
* <CheckoutModal
*     checkout={this.props.checkout}
*     show={this.state.showModal}
*     close={this.handleCloseModal}
* >
* @memberof module:components
* @extends React.Component
* @param {Object} props - The props that were passed to the component.
* @param {function} props.checkout - Function to check out the cart.
* @param {boolean} props.show - Whether or not the component should show.
* @param {function} props.close - Closes the modal.
* @returns {JSX.Element}
*/
class CheckoutModal extends Component {

    /**
    * Creates a new instance of CheckoutModal.
    * @constructor
    */
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
    * Handles the form submission and calls the parent checkout function.
    * @async
    * @function
    * @param {Object} e - The form submission event.
    * @returns {void}
    */
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

    /**
    * Renders the component.
    * 
    * @memberof module:components.CheckoutModal
    * @returns {JSX.Element} - The rendered component.
    */
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart Checkout</Modal.Title>
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
