import React, { Component } from 'react';
import DataTable from "./DataTable";

class DataManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: pets,
            search: null,
            fetchedData: null
        };
    }

    // --- type
    // 1. fetch data upon component render, by default fetch pets data
    // 2. set state of type and search from user input onChange
    // --- search
    // 1. update search state on change -> move to the DataTable?

    render() {
        return (
            <div className="Container" style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <h2>Manage Data</h2>
                </div>
                <div style={{ flexDirection: 'column' }}>
                    <button type="submit"> Type</button>
                    <button type="submit"> Add</button>
                    <button type="submit"> Search</button>
                </div>
                <div>
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