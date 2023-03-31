import React, { Component } from 'react';
import DataTable from "./DataTable";
import Form from 'react-bootstrap/Form';
import PetModal from "./modals/PetModal";
import SuppliesModal from "./modals/SuppliesModal";

/**
* A component to manage pet and supplies data displayed in a DataTable.
* @component
*/

class DataManager extends Component {
    constructor(props) {
        super(props);
        /**
        * @typedef {Object} DataManagerState
        * @property {string} search - Search string to filter displayed data.
        * @property {Array<Object>} fetchedData - Data fetched from server.
        * @property {boolean} showModal - Controls visibility of modals.
        * @property {string} type - The type of data being displayed (pets or supplies).
        */
        /** @type {DataManagerState} */
        this.state = {
            search: '',
            fetchedData: null,
            showModal: false,
            type: "pets"
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }
    /**
     * Sets the showModal state to true.
     */
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    /**
     * Sets the showModal state to false.
     */
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    /**
     * Sets the search state to the value of the search input element.
     * @param {object} e - The event object.
     */
    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    /**
    * Fetches pet or supplies data based on the Form.Select selection.
    * Called onChange.
    * @param {object} e - The event object.
    */
    handleTypeChange = async (e) => {
        this.setState({ type: e.target.value })
        if (e.target.value === "pets") {
            try {
                const response = await fetch('http://localhost:3000/api/petData');
                const pets = await response.json();
                this.setState({
                    fetchedData: pets
                });
            } catch (error) {
                console.error(error);
            }
        }
        else if (e.target.value === "supplies") {
            try {
                const response = await fetch('http://localhost:3000/api/suppliesData');
                const supplies = await response.json();
                this.setState({
                    fetchedData: supplies
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
    /**
    * Updates the fetchedData state with the updated data.
    * @param {object} updatedData - The data to update.
    */
    handleUpdate = (updatedData) => {
        const keyToUpdate = updatedData._id;
        // fetchedDataCopy is fetchedData but the object with the same key as keyToUpdate is being replaced with updatedData
        const fetchedDataCopy = this.state.fetchedData.map((data) => {
            if (data._id === keyToUpdate) {
                return updatedData;
            }
            return data;
        });
        this.setState({ fetchedData: fetchedDataCopy });
    }

    /**
    * Adds new data to the fetchedData state.
    * @param {object} newData - The new data to add.
    */
    handleSave = (newData) => {
        const updatedData = [...this.state.fetchedData, newData];
        this.setState({ fetchedData: updatedData });
    }

    /**
    * Function that handles the deletion of a pet or a supply from the database
    * @async
    * @function
    * @param {string} key - the unique key that identifies the item to be deleted
    * @returns {void}
    */
    handleDelete = async (key) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            if (this.state.type === "pets")
                try {
                    await fetch(`http://localhost:3000/api/deletePet?key=${key}`);
                    // update the state to remove the deleted item
                    // filter creates a shallow copy of the array and filters what does not pass the conditional statement
                    const updatedData = this.state.fetchedData.filter(data => data._id !== key);
                    this.setState({ fetchedData: updatedData });
                } catch (error) {
                    console.error(error);
                }
            else if (this.state.type === "supplies") {
                try {
                    await fetch(`http://localhost:3000/api/deleteSupply?key=${key}`);
                    // update the state to remove the deleted item
                    // filter creates a shallow copy of the array and filters what does not pass the conditional statement
                    const updatedData = this.state.fetchedData.filter(data => data._id !== key);
                    this.setState({ fetchedData: updatedData });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    /**
    * Lifecycle method that fetches the pet data from the server and updates the component's state accordingly
    * @async
    * @function
    * @returns {void}
    */
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:3000/api/petData');
            const pets = await response.json();
            this.setState({
                fetchedData: pets
            });
        } catch (error) {
            console.error(error);
        }
    }
    /**
    * Renders the DataManager component
    * @function
    * @returns {JSX.Element}
    */
    render() {
        return (
            <div className="maxvp flexCenter whitebg">
                <div className="Container row xLarge">
                    <div className="centerText ">
                        <h1>Database Manager </h1>
                    </div>
                    <div className="col medPad" >
                        <div className="row">
                            <div className="col-4 smallPad">
                                <Form.Select onChange={this.handleTypeChange}>
                                    <option value="pets">Pets</option>
                                    <option value="supplies">Supplies</option>
                                </Form.Select>
                            </div>
                            <button onClick={this.handleOpenModal} type="submit" className="col-3 smallPad btn btn-success" style={{ marginRight: 10 }}>Add</button>
                            <input onChange={this.handleSearch} type="search" className="smallPad flex" id="search" placeholder="Search"></input>

                        </div>
                    </div>
                    <div>
                        <DataTable
                            tableData={this.state.fetchedData}
                            search={this.state.search}
                            update={this.handleUpdate}
                            delete={this.handleDelete}
                            type={this.state.type}
                        />
                    </div>
                    {this.state.type === "pets" ? <PetModal
                        handleCloseModal={this.handleCloseModal}
                        save={this.handleSave}
                        show={this.state.showModal}
                        pet={null}
                        job="save"
                    >
                    </PetModal>
                        :
                        <SuppliesModal
                            handleCloseModal={this.handleCloseModal}
                            save={this.handleSave}
                            show={this.state.showModal}
                            supply={null}
                            job="save"
                        >
                        </SuppliesModal>
                    }
                </div>
            </div>
        )
    }
}

export default DataManager;