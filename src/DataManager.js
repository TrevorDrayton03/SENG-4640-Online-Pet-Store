import React, { Component } from 'react';
import DataTable from "./DataTable";
import Form from 'react-bootstrap/Form';

// DataManager is the parent component to DataTable.
// DataManager has three states: type, search, and fetchedData.
// Datamanager manages the data which the DataTable displays.

class DataManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            fetchedData: null,
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // fetches pets or supplies data based on the Form.Select selection
    // is called onChange
    handleTypeChange = async (e) => {
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
            this.setState({
                fetchedData: null
            });
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

    // back tick "`" is used here for string interpolation
    handleDelete = async (key) => {
        try {
            await fetch(`http://localhost:3000/api/delete?key=${key}`);
            // update the state to remove the deleted item
            // filter creates a shallow copy of the array and filters what does not pass the conditional statement
            const updatedData = this.state.fetchedData.filter(data => data._id !== key);
            this.setState({ fetchedData: updatedData });
        } catch (error) {
            console.error(error);
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
            <div className="Container blackBorder row large">
                <div className="blackBorder centerText">
                    <h2>Database Manager</h2>
                </div>
                <div className="col medPad">
                    <div className="row">
                        <div className="col-4 smallPad">
                            <Form.Select onChange={this.handleTypeChange}>
                                <option value="pets">Pets</option>
                                <option value="supplies">Supplies</option>
                            </Form.Select>
                        </div>
                        <button type="submit" className="col-3 smallPad btn btn-success" style={{ marginRight: 10 }}>Add</button>
                        <input type="search" className="smallPad flex" id="search" placeholder="Search"></input>

                    </div>
                </div>
                <div className="blackBorder">
                    <DataTable
                        tableData={this.state.fetchedData}
                        search={this.state.search}
                        update={this.handleUpdate}
                        delete={this.handleDelete}
                    />
                </div>
            </div>
        )
    }
}

export default DataManager;