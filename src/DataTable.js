import React, { Component } from 'react';

// https://www.positronx.io/how-to-insert-form-values-or-data-in-react-table-component/

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props,

        };
    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Breed</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData && tableData.map((data) => {
                        return (
                            <tr key={data._id}>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}

export default DataTable;