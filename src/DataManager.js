import React, { Component } from 'react';
import DataTable from "./DataTable";
import Form from 'react-bootstrap/Form';

class DataManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            search: null,
            fetchedData: null,
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    handleTypeChange = (e) => {
        this.setState({ type: e.target.value });
    }

    async componentDidUpdate() {
        if (this.state.type === "pets") {
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
        else if (this.state.type === "supplies") {
            this.setState({
                fetchedData: null
            });
        }
        else {
            this.setState({
                fetchedData: null
            });
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
                                <option value="">Select a type</option>
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
                    />
                </div>
            </div>
        )
    }
}

export default DataManager;