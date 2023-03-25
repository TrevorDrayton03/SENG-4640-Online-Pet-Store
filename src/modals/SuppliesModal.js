import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// SuppliesModal is used to add to the pet collection or update data from the pet collection in our MongoDB.

class SuppliesModal extends Component {
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

        if (this.props.job === "update") {
            try {
                const response = await fetch('http://localhost:3000/api/updateSupply', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: e.target.name.value,
                        type: e.target.type.value,
                        dimension: e.target.dimension.value,
                        weight: e.target.weight.value,
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
        }
        else if (this.props.job === "save") {
            try {
                const response = await fetch('http://localhost:3000/api/saveSupply', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: e.target.name.value,
                        type: e.target.type.value,
                        dimension: e.target.dimension.value,
                        weight: e.target.weight.value,
                        description: e.target.description.value,
                        url: e.target.url.value,
                        price: e.target.price.value
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to save');
                }
                this.props.save(await response.json());

            } catch (error) {
                console.error(error);
            }
        }
        this.props.handleCloseModal();
    };

    render() {
        if (this.props.job === "update") {
            return (
                <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update {this.props.supply ? this.props.supply.name : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            noValidate
                            validated={true}
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    defaultValue={this.props.supply ? this.props.supply.name : ''}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    name="age"
                                    defaultValue={this.props.supply ? this.props.supply.age : ''}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    required
                                    name="type"
                                    defaultValue={this.props.supply ? this.props.supply.type : ''}
                                    type="text"
                                />
                                {/* <Form.Control.Feedback type="invalid">Type is required!</Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Breed</Form.Label>
                                <Form.Control
                                    name="breed"
                                    defaultValue={this.props.supply ? this.props.supply.breed : ''}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name="description"
                                    defaultValue={this.props.supply ? this.props.supply.description : ''}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    name="url"
                                    defaultValue={this.props.supply ? this.props.supply.url : ''}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    defaultValue={this.props.supply ? this.props.supply.price : ''}
                                    type="text"
                                    required
                                />
                            </Form.Group>
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
                            onClick={this.props.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        else if (this.props.job === "save") {
            return (
                <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Supply</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            noValidate
                            validated={true}
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    defaultValue={null}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    name="weight"
                                    defaultValue={null}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    required
                                    name="type"
                                    defaultValue={null}
                                    type="text"
                                />
                                {/* <Form.Control.Feedback type="invalid">Type is required!</Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Dimension</Form.Label>
                                <Form.Control
                                    name="dimension"
                                    defaultValue={null}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name="description"
                                    defaultValue={null}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    name="url"
                                    defaultValue={null}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    defaultValue={null}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                defaultValue={null}
                                type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.props.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}

export default SuppliesModal;
