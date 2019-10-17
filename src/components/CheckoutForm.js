import React from 'react'

import {requestHeaders, simpleOrder} from '../resources/Api'

class CheckoutForm extends React.Component {

  state = {
    name: {value: '', valid: true},
    lastName: {value: '', valid: true},
    address: {value: '', valid: true},
    paymentMethod: {value: '', valid: true},
    addressIsValid: false
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const valid = value ? true : false;

    this.setState({
      [name]: {value: value, valid: valid}
    });
  }

  handleAddressSubmission = (event) => {
    event.preventDefault()
    this.simpleValidation()
    this.setState({
      paymentMethod: {value: 'Credit Card', valid: true}
    })
  }

  handleOrderSubmission = (event) => {
    event.preventDefault()

    let orderData = simpleOrder
    orderData.consumer.givenNames = this.state.name.value
    orderData.consumer.surname = this.state.lastName.value
    orderData.consumer.email = this.state.address.value

     fetch('/v1/orders', {
       method: 'POST',
       headers: new Headers(requestHeaders),
       body: JSON.stringify(orderData)
     })
      .then((response) => {
        if(!response.ok) throw new Error(response.status)
        response.json().then((data) => alert('Your order paid with ' + this.state.paymentMethod.value + ' has been successfully processed, here\'s your token: ' + data.token))
     })
      .catch((error) => {
        alert('There has been a problem processing your order, please contact support')
     });

  }

  simpleValidation = () => {
    var isValid = true;
    var name = this.state.name;
    var lastName = this.state.lastName;
    var address = this.state.address;
    if (!this.state.name.value) {
      isValid = false;
      name.valid = isValid;
    }
    if (!this.state.lastName.value) {
      isValid = false;
      lastName.valid = isValid;
    }
    if (!this.state.address.value) {
      isValid = false;
      address.valid = isValid;
    }

    this.setState({
      name: name,
      lastName: lastName,
      address: address,
      addressIsValid: isValid
    })
  }

  render(){
    return (
      <div>
        <div className={"row " + (!this.state.addressIsValid ? '' : 'hidden')}>
          <div className="col-md-6 ">
            <h2>Billing address</h2>
            <form className="needs-validation" onSubmit={this.handleAddressSubmission}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" className="form-control" id="firstName" name="name" required="" onChange={this.handleInputChange} />
                  <div className={"invalid-feedback " + (!this.state.name.valid ? '' : 'hidden')}>
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" className="form-control" id="lastName" name="lastName" required="" onChange={this.handleInputChange} />
                  <div className={"invalid-feedback " + (!this.state.lastName.valid ? '' : 'hidden')}>
                    Valid last name is required.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="address" placeholder="you@example.com" onChange={this.handleInputChange} />
                <div className={"invalid-feedback " + (!this.state.address.valid ? '' : 'hidden')}>
                  Valid email is required.
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
          </div>
        </div>
        <div className={"row step-2 " + (this.state.addressIsValid ? '' : 'hidden')}>
          <div className="col-md-6 ">
            <h2>Select payment</h2>
            <form onSubmit={this.handleOrderSubmission}>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value="Credit Card" required="required" onChange={this.handleInputChange} />
                  <label className="custom-control-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value="Debit Card" required="required" onChange={this.handleInputChange} />
                  <label className="custom-control-label" htmlFor="debit">Debit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" value="PayPal" required="required" onChange={this.handleInputChange} />
                  <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">Submit Order</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutForm;