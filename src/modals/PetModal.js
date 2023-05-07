import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

/**
* PetModal.js is used for adding or updating pet data from MongoDB.
* @example 
* <PetModal
*     handleCloseModal={this.handleCloseModal}
*     save={null}
*     show={this.state.showModal}
*     pet={this.state.modalData}
*     job="update"
*     update={this.props.update}
* >
* @param {Object} props Component props
* @param {function} props.handleCloseModal The function to close the modal
* @param {function} props.save Updates the fetchedData state in the DataManager component
* @param {boolean} props.show Component props
* @param {Object} props.pet The pet to display in the modal
* @param {String} props.job Determines whether the modal's job is to "update" or "save" data in MongoDB
* @param {Function} props.update - A function to update a row in the DataTable.
* @returns {JSX.Element}
* @extends Component
*/
class PetModal extends Component {

    /**
    * @constructor
    */
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Method to handle form submission.
     * @async
     * @method
     * @param {Object} e - The event object.
     */
    handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            return;
        }

        if (this.props.job === "update") {
            try {
                const response = await fetch('https://p-u-backend-only.onrender.com/api/updatePet', {
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
        }
        else if (this.props.job === "save") {
            try {
                const response = await fetch('https://p-u-backend-only.onrender.com/api/savePet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
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
    * @memberof PetModal
    * @returns {JSX.Element} - The rendered component.
    */
    render() {
        if (this.props.job === "update") {
            return (
                <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update {this.props.pet ? this.props.pet.name : ''}</Modal.Title>
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
                                    defaultValue={this.props.pet ? this.props.pet.name : ''}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    name="age"
                                    defaultValue={this.props.pet ? this.props.pet.age : ''}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    required
                                    name="type"
                                    defaultValue={this.props.pet ? this.props.pet.type : ''}
                                    type="text"
                                />
                                {/* <Form.Control.Feedback type="invalid">Type is required!</Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Breed</Form.Label>
                                <Form.Control
                                    name="breed"
                                    defaultValue={this.props.pet ? this.props.pet.breed : ''}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name="description"
                                    defaultValue={this.props.pet ? this.props.pet.description : ''}
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    name="url"
                                    defaultValue={this.props.pet ? this.props.pet.url : ''}
                                    type="text"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    defaultValue={this.props.pet ? this.props.pet.price : ''}
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
                        <Modal.Title>Add New Pet</Modal.Title>
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
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    name="age"
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
                                <Form.Label>Breed</Form.Label>
                                <Form.Control
                                    name="breed"
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

export default PetModal;
