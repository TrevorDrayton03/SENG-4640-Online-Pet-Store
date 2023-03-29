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

    render() {
        return (
            <div className="Container maxvp">
                <div className="large centerText">
                    <h1 className="center centerText">Customer Service</h1>
                    <p>
                        Have any questions or concerns? Let us know right away!
                    </p>
                    <p>
                        Email us below or call us at 1 (250) 789-1234.
                    </p>
                    <form target="_blank" action="https://formsubmit.co/trevorpdrayton@gmail.com" method="POST">
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <input type="text" name="name" className="form-control" placeholder="Full Name" required />
                                </div>
                                <div className="col">
                                    <input type="email" name="email" className="form-control" placeholder="Email Address" required />
                                </div>
                                <input type="hidden" name="_next" value="http://localhost:3000/" />
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Your Message" className="form-control" name="message" rows="10" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                    </form>
                </div>
            </div >
        );
    }
}

export default CustomerService;
