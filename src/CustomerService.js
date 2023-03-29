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
                <div className="large">
                    <h1 className="center centerText">Customer Service</h1>
                    <p style={{ textAlign: "left" }}>
                        Have any questions or concerns? Let us know right away!
                    </p>
                    <p style={{ textAlign: "left" }}>
                        Email us below or call us at 1 (250) 789-1234.
                    </p>
                    <form target="_blank" action="https://formsubmit.co/trevorpdrayton@gmail.com" method="POST">
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <input type="text" name="name" class="form-control" placeholder="Full Name" required />
                                </div>
                                <div class="col">
                                    <input type="email" name="email" class="form-control" placeholder="Email Address" required />
                                </div>
                                <input type="hidden" name="_next" value="http://localhost:3000/" />
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Your Message" class="form-control" name="message" rows="10" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-lg btn-primary">Submit Form</button>
                    </form>
                </div>
            </div >
        );
    }
}

export default CustomerService;
