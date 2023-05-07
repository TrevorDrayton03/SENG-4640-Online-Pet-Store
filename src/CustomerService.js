import React, { Component } from 'react';

/**
* CustomerService React Component.
* Displays frequently asked questions and a contact form for customers to reach out.
* Uses formsubmit.io to send emails.
* @example
* <CustomerService />
* @extends React.Component
* @returns {JSX.Element}
*/
class CustomerService extends Component {

    /**
    * Constructor for CustomerService component.
    * @constructor
    */
    constructor(props) {
        super(props);
    }
    /**
    * Render CustomerService Component
    * @memberof CustomerService
    * @returns {JSX.Element} CustomerService Component
    */
    render() {
        return (
            <div className="Container maxvp">
                <div className="large centerText">
                    <h1 className="center centerText">Frequently Asked Questions</h1>
                    <h2>
                        Where do you get your pets from?
                    </h2>
                    <p>
                        All of our good boys and girls are from our local humane society, because we believe every animal deserves a loving home and we hope you can help provide them with one.
                    </p>
                    <h2>
                        How do I feed my new pet?
                    </h2>
                    <p>
                        When dealing with a new pet approach them with food in your hand, showing it clearly and place it near them.
                    </p>
                    <h2>
                        What is your refund policy like?
                    </h2>
                    <p>
                        We allow refunds up to 14 days with our pets and 30 days with our supplies if they have not been damaged.
                    </p>
                    <br></br>
                    <h1 style={{ fontWeight: 'bold' }}>
                        Have any further questions or concerns?
                    </h1>
                    <p className='noPadTopBottom'>
                        Let us know right away! Email us below or call us at 1 (250) 555-1234.
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
                                <input type="hidden" name="_next" value="https://p-u-backend-only.onrender.com/" />
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
