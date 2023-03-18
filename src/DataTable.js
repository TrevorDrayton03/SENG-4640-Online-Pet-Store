import React, { Component } from 'react';
import PetModal from "./modals/PetModal";

// DataTable displays database data for the admin and offers options to update, delete, or add data.
// DataTable is the parent component to PetModal and SuppliesModal.

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            search: this.props.search,
            showPetModal: false,
            showSuppliesModal: false,
            modalData: null
        };

        this.handleUpdatePress = this.handleUpdatePress.bind(this);
        this.handleClosePetModal = this.handleClosePetModal.bind(this);

    }
    // required because tableData is asynchronous information that is retreived after the render
    // componentDidUpdate will execute if the props or state are updated after the render
    componentDidUpdate(prevProps) {
        if (prevProps.tableData !== this.props.tableData) {
            this.setState({ tableData: this.props.tableData });
        }
        if (prevProps.search !== this.props.search) {
            this.setState({ search: this.props.search });
        }
    }

    handleUpdatePress = (data) => {
        this.setState({ showPetModal: true, modalData: data });
    }

    handleClosePetModal = () => {
        this.setState({ showPetModal: false, modalData: null });
    }

    render() {
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
                            <th className="width8"></th>
                            <th className="width9"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData && this.state.tableData.map((data) => {
                            return (
                                <tr key={data._id}>
                                    <td className="width7">{data.name}</td>
                                    <td className="width7">{data.age}</td>
                                    <td className="width7">{data.type}</td>
                                    <td className="width7">{data.breed}</td>
                                    <td>{data.description}</td>
                                    <td>{data.url}</td>
                                    <td className="width7">{data.price}</td>
                                    <td className="width8">
                                        <button className="btn btn-danger" onClick={() => this.props.delete(data._id)}>Delete</button>
                                    </td>
                                    <td className="width9">
                                        <button className="btn btn-warning" onClick={() => {
                                            this.handleUpdatePress(data)
                                        }}>Update</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <PetModal
                    handleClosePetModal={this.handleClosePetModal}
                    update={this.props.update}
                    pet={this.state.modalData}
                    show={this.state.showPetModal}>
                </PetModal>
            </div>
        )
    }
}

export default DataTable;