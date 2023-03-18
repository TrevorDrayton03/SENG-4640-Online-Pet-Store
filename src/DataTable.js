import React, { Component } from 'react';
import PetModal from "./modals/PetModal";

// DataTable displays database data for the admin and offers options to update, delete, or add data.
// DataTable utilizes PetModal to update objects in MongoDB.

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            showPetModal: false,
            showSuppliesModal: false,
            modalData: null
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClosePetModal = this.handleClosePetModal.bind(this);

    }
    // required because tableData is asynchronous information that is retreived after the render
    // componentDidUpdate will execute if the props or state are updated after the render
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tableData !== this.props.tableData) {
            this.setState({ tableData: this.props.tableData });
        }
    }

    handleUpdate = (data) => {
        this.setState({ showPetModal: true, modalData: data });
    }

    handleClosePetModal = () => {
        this.setState({ showPetModal: false, modalData: null });
    }

    render() {
        let filteredData = null;
        // filters tableData with search string
        if (this.state.tableData) {
            filteredData = this.state.tableData.filter((data) => {
                const searchRegex = new RegExp(this.props.search, 'i');
                return (
                    searchRegex.test(data.name) ||
                    searchRegex.test(data.age) ||
                    searchRegex.test(data.type) ||
                    searchRegex.test(data.breed) ||
                    searchRegex.test(data.description) ||
                    searchRegex.test(data.url) ||
                    searchRegex.test(data.price)
                );
            });
        }

        return (
            <div className="Container">
                <table className="table" width="100%">
                    <thead>
                        <tr>
                            <th className="width7">Name</th>
                            <th className="width7">Age</th>
                            <th className="width7">Type</th>
                            <th className="width7">Breed</th>
                            <th>Description</th>
                            <th>Image URL</th>
                            <th className="width7">Price</th>
                            <th className="width9"></th>
                            <th className="width8"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData &&
                            filteredData ? filteredData.map((data) => {
                                return (
                                    <tr key={data && data._id}>
                                        <td className="width7">{data.name}</td>
                                        <td className="width7">{data.age}</td>
                                        <td className="width7">{data.type}</td>
                                        <td className="width7">{data.breed}</td>
                                        <td>{data.description}</td>
                                        <td>{data.url}</td>
                                        <td className="width7">{data.price}</td>
                                        <td className="width9">
                                            <button className="btn btn-warning" onClick={() => {
                                                this.handleUpdate(data)
                                            }}>Update</button>
                                        </td>
                                        <td className="width8">
                                            <button className="btn btn-danger" onClick={() => this.props.delete(data._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                            : this.state.tableData &&
                            this.state.tableData.map((data) => {
                                return (
                                    <tr key={data && data._id}>
                                        <td className="width7">{data.name}</td>
                                        <td className="width7">{data.age}</td>
                                        <td className="width7">{data.type}</td>
                                        <td className="width7">{data.breed}</td>
                                        <td>{data.description}</td>
                                        <td>{data.url}</td>
                                        <td className="width7">{data.price}</td>
                                        <td className="width9">
                                            <button className="btn btn-warning" onClick={() => {
                                                this.handleUpdate(data)
                                            }}>Update</button>
                                        </td>
                                        <td className="width8">
                                            <button className="btn btn-danger" onClick={() => this.props.delete(data._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <PetModal
                    handleClosePetModal={this.handleClosePetModal}
                    update={this.props.update}
                    pet={this.state.modalData}
                    show={this.state.showPetModal}
                    job="update"
                >
                </PetModal>
            </div>
        )
    }
}

export default DataTable;