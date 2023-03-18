import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// PetModal is used to add to the pet collection or update data from the pet collection in our MongoDB.

class PetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
    }

    handleClose = () => {
        this.setState({ show: false });
        this.props.handleClosePetModal();
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: this.props.pet._id,
                    name: e.target.name.value,
                    age: e.target.age.value,
                    type: e.target.type.value,
                    breed: e.target.breed.value,
                    description: e.target.description.value,
                    url: e.target.url.value,
                    price: e.target.price.value
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update');
            }

            this.props.update(await response.json());

        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {this.props.pet ? this.props.pet.name : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" defaultValue={this.props.pet ? this.props.pet.name : ''} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control name="age" defaultValue={this.props.pet ? this.props.pet.age : ''} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control name="type" defaultValue={this.props.pet ? this.props.pet.type : ''} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control name="breed" defaultValue={this.props.pet ? this.props.pet.breed : ''} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" defaultValue={this.props.pet ? this.props.pet.description : ''} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control name="url" defaultValue={this.props.pet ? this.props.pet.url : ''} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" defaultValue={this.props.pet ? this.props.pet.price : ''} type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PetModal;
