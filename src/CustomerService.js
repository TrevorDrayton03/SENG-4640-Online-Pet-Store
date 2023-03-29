import React, { Component } from 'react';

class CustomerService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            subject: null,
            message: null
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:customerservice@petuniverse.com?subject=${encodeURIComponent(this.state.subject)}&body=${encodeURIComponent(`Name: ${this.state.name}\nMessage: ${this.state.message}`)}`;
        window.location.href = mailtoLink;
    };

    render() {
        return (
            <div className="Container maxvp">
                <div className="large">
                    <h1 className="center centerText">Customer Service</h1>
                    <p style={{ textAlign: "left" }}>
                        Have any questions or concerns? Let us know right away!
                    </p>
                    <p style={{ textAlign: "left" }}>
                        Email us below or call us at 1 (250) 789-1234.
                    </p>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <div>
                                <label htmlFor="name"><strong>Name:</strong></label>
                            </div>
                            <div>
                                <input type="text" id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="subject"><strong>Subject:</strong></label>
                                <div>
                                    <input type="text" id="subject" value={this.state.subject} onChange={(e) => this.setState({ subject: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="message"><strong>Message:</strong>
                                </label>
                            </div>
                            <div>
                                <textarea rows={10} cols={100} id="message" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>

                        </div>
                    </form>
                </div >
            </div >
        );
    }
}

export default CustomerService;
