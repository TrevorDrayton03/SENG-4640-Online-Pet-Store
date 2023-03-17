import React, { Component } from 'react';


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            search: this.props.search
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableData !== this.props.tableData) {
            this.setState({ tableData: this.props.tableData });
        }
        if (prevProps.tableData !== this.props.tableData) {
            this.setState({ tableData: this.props.tableData });
        }
    }

    // back tick "`" is used here for string interpolation
    handleDelete = async (key) => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete?key=${key}`);
            const result = await response.text();
            // if (result === 'Success') {
            //     this.fetchData();
            // }
        } catch (error) {
            console.error(error);
        }
    }
    handleUpdate = (key) => {
        // fetch update
    }

    render() {
        return (
            <table className="table" width="100%">
                <thead>
                    <tr>
                        <th className="width6">Name</th>
                        <th className="width6">Age</th>
                        <th className="width6">Type</th>
                        <th className="width6">Breed</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th className="width6">Price</th>
                        <th className="width8"></th>
                        <th className="width9"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 </td>
                        <td>123 123 1123123 123 1123123 123 1123123 123 1123</td>
                        <td>123 123 1123123 123 1123123 123 1123123 123 11231123123 123 1123123 123 11231123123 123 1123123 123 1123</td>
                        <td>123 123 1123123 123 1123123 123 1123123 123 1123</td>
                        <td>11231123123112311231231123112312311231123123112311231231123112312311231123123112311231231123112312311231123123112311231231123112312311231123123112311231231123112312311231123123112311231231123112312311231123123</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => this.handleDelete(1)}>Delete</button>
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={() => this.handleUpdate(2)}>Update</button>
                        </td>
                    </tr>
                    {this.state.tableData && this.state.tableData.map((data) => {
                        return (
                            <tr key={data._id}>
                                <td className="width6">{data.name}</td>
                                <td className="width6">{data.age}</td>
                                <td className="width6">{data.type}</td>
                                <td className="width6">{data.breed}</td>
                                <td>{data.description}</td>
                                <td>{data.url}</td>
                                <td className="width6">{data.price}</td>
                                <td className="width8">
                                    <button className="btn btn-danger" onClick={() => this.handleDelete(data._id)}>Delete</button>
                                </td>
                                <td className="width9">
                                    <button className="btn btn-warning" onClick={() => this.handleUpdate(data._id)}>Update</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}

export default DataTable;