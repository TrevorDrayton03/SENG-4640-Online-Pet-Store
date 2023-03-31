import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

/**
* React Component for adding or updating pet supplies in a MongoDB database.
* @component
* @param {Object} props - The props object containing the following properties:
* @param {string} props.job - Indicates whether the component should be used for saving a new supply or updating an existing one.
* @param {boolean} props.show - Indicates whether the modal should be shown or hidden.
* @param {Object} props.supply - The supply object to be updated. If null, a new supply is being added.
* @param {Function} props.handleCloseModal - The function to close the modal.
* @param {Function} props.save - The function to save a new supply to the MongoDB database.
* @param {Function} props.update - The function to update an existing supply in the MongoDB database.
* @returns {JSX.Element} - A modal with a form for adding or updating pet supplies.
*/
class SuppliesModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handles the submit event of the form by sending a POST request to the appropriate API endpoint.
     * If the request is successful, the supply is either added or updated in the MongoDB database.
     * Finally, the modal is closed.
     * @memberof SuppliesModal
     * @param {Object} e - The event object of the submit event.
     * @returns {void}
     */
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
                        key: this.props.supply._id,
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

    /**
    * Renders the component.
    * 
    * @memberof SuppliesModal
    * @returns {JSX.Element} - The rendered component.
    */
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
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    name="weight"
                                    defaultValue={this.props.supply ? this.props.supply.weight : ''}
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
                                <Form.Label>Dimension</Form.Label>
                                <Form.Control
                                    name="dimension"
                                    defaultValue={this.props.supply ? this.props.supply.dimension : ''}
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
