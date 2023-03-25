import React, { Component } from 'react';
import DataTable from "./DataTable";
import Form from 'react-bootstrap/Form';
import PetModal from "./modals/PetModal";
import SuppliesModal from "./modals/SuppliesModal";


// DataManager is the parent component to DataTable.
// DataManager has three states: type, search, and fetchedData.
// Datamanager manages the data which the DataTable displays.
// Datamanager utilizes Modals for saving new objects to MongoDB.

class DataManager extends Component {
    constructor(props) {
        super(props);
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

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    // fetches pets or supplies data based on the Form.Select selection
    // is called onChange
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

    // shallow copy the current state and add the new data to the end
    handleSave = (newData) => {
        const updatedData = [...this.state.fetchedData, newData];
        this.setState({ fetchedData: updatedData });
    }

    // back tick "`" is used here for string interpolation
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

    // by default fetch pets data to display
    // componentDidMount gets called once the component has been rendered for the first time (mounted onto the DOM)
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

    render() {
        return (
            <div className="maxvp flexCenter whitebg">
                <div className="xLarge">
                    <div className="Container row">
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
            </div>
        )
    }
}

export default DataManager;