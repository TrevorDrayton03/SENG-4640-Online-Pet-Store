import React, { Component } from 'react';
import PetModal from "./modals/PetModal";
import SuppliesModal from "./modals/SuppliesModal";

// DataTable displays database data for the admin and offers options to update, delete, or add data.
// DataTable utilizes Modals to update objects in MongoDB.

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            showModal: false,
            showSuppliesModal: false,
            modalData: null
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    // required because tableData is asynchronous information that is retreived after the render
    // componentDidUpdate will execute if the props or state are updated after the render
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tableData !== this.props.tableData) {
            this.setState({ tableData: this.props.tableData });
        }
    }

    handleUpdate = (data) => {
        this.setState({ showModal: true, modalData: data });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, modalData: null });
    }

    render() {
        let type = this.props.type;
        let filteredData = null;
        // filters tableData with search string
        if (this.state.tableData) {
            filteredData = this.state.tableData.filter((data) => {
                const searchRegex = new RegExp(this.props.search, 'i');
                return (
                    searchRegex.test(data.name) ||
                    searchRegex.test(type === "pets" ? data.age : data.weight) ||
                    searchRegex.test(data.type) ||
                    searchRegex.test(data.breed) ||
                    searchRegex.test(type === "pets" ? data.breed : data.dimension) ||
                    searchRegex.test(data.url) ||
                    searchRegex.test(data.description) ||
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
                            <th className="width7">{type === "pets" ? "Age" : "Weight"}</th>
                            <th className="width7">Type</th>
                            <th className="width7">{type === "pets" ? "Breed" : "Dimension"}</th>
                            <th>Description</th>
                            <th>Image URL</th>
                            <th className="width7">Price</th>
                            <th className="width7"></th>
                            <th className="width7"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData &&
                            filteredData ? filteredData.map((data) => {
                                return (
                                    <tr key={data && data._id}>
                                        <td className="width7">{data.name}</td>
                                        <td className="width7">{type === "pets" ? data.age : data.weight}</td>
                                        <td className="width10">{data.type}</td>
                                        <td className="width10">{type === "pets" ? data.breed : data.dimension}</td>
                                        <td>{data.description}</td>
                                        <td>{data.url}</td>
                                        <td className="width7">{data.price}</td>
                                        <td className="width7">
                                            <button className="btn btn-warning" onClick={() => {
                                                this.handleUpdate(data)
                                            }}>Update</button>
                                        </td>
                                        <td className="width7">
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
                                        <td className="width7">{type === "pets" ? data.age : data.weight}</td>
                                        <td className="width10">{data.type}</td>
                                        <td className="width10">{type === "pets" ? data.breed : data.dimension}</td>
                                        <td>{data.description}</td>
                                        <td>{data.url}</td>
                                        <td className="width7">{data.price}</td>
                                        <td className="width5">
                                            <button className="btn btn-warning" onClick={() => {
                                                this.handleUpdate(data)
                                            }}>Update</button>
                                        </td>
                                        <td className="width5">
                                            <button className="btn btn-danger" onClick={() => this.props.delete(data._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                {this.props.type === "pets" ? <PetModal
                    handleCloseModal={this.handleCloseModal}
                    save={null}
                    show={this.state.showModal}
                    pet={this.state.modalData}
                    job="update"
                    update={this.props.update}
                >
                </PetModal>
                    :
                    <SuppliesModal
                        handleCloseModal={this.handleCloseModal}
                        save={null}
                        show={this.state.showModal}
                        supply={this.state.modalData}
                        job="update"
                        update={this.props.update}
                    >
                    </SuppliesModal>
                }
            </div>
        )
    }
}

export default DataTable;