import React, { Component } from 'react';
import PetModal from "./modals/PetModal";
import SuppliesModal from "./modals/SuppliesModal";

/**
* DataTable.js handles each row of data for the DataManager component.
* It displays database data for the admin and offers options to update, delete, or add data.
* Utilizes modals to update objects in MongoDB.
* @example
* <DataTable
*   type="pets"
*   tableData={data}
*   search={searchString}
*   delete={deleteData}
*   update={updateData}
* />
* @extends React.Component
* @param {Object} props - The component's properties.
* @param {string} props.type - The type of data to display (either "pets" or "supplies").
* @param {Array<Object>} props.tableData - The data to display in the table.
* @param {string} props.search - The search string to filter the data.
* @param {Function} props.delete - A function to delete a row from the table.
* @param {Function} props.update - A function to update a row in the table.
* @returns {JSX.Element} - A DataTable component displaying the database data.
*/
class DataTable extends Component {

    /**
    * Creates a new DataTable.
    * @constructor
    */
    constructor(props) {
        super(props);

        /**
        * The component's state.
        * @property {Object} state
        * @property {Array<Object>} state.tableData - The data to display in the table.
        * @property {boolean} state.showModal - Whether the modal is visible.
        * @property {Object|null} state.modalData - The data to display in the modal.
        */
        this.state = {
            tableData: this.props.tableData,
            showModal: false,
            modalData: null
        };

        /**
        * The function to handle an update in the modal.
        * @param {Object} data - The data to update.
        */
        this.handleUpdate = this.handleUpdate.bind(this);

        /**
        * The function to close the modal.
        */
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    /**
    * Updates the state with new tableData if the props have changed.
    * @param {Object} prevProps - The previous properties.
    * @param {Array<Object>} prevProps.tableData - The previous table data.
    * @param {string} prevProps.search - The previous search string.
    */
    componentDidUpdate(prevProps) {
        if (prevProps.tableData !== this.props.tableData) {
            this.setState({ tableData: this.props.tableData });
        }
    }

    /**
    * Handles an update in the modal.
    * @param {Object} data - The data to update.
    */

    handleUpdate = (data) => {
        this.setState({ showModal: true, modalData: data });
    }

    /**
    * Closes the modal.
    */
    handleCloseModal = () => {
        this.setState({ showModal: false, modalData: null });
    }

    /**
    * Renders the component.
    * 
    * @memberof DataManager
    * @returns {JSX.Element} - The rendered component.
    */
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