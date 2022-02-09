import {Component} from 'react'

import './index.css'

import ListHandiling from '../ListHandling'

class RegistrationForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    isErrorFirstname: false,
    firstNameError: '',
    isErrorLastname: false,
    isNotSubmitSucces: true,
    lastNameError: '',
    email: '',
    message: '',
    add: '',
    submittedList: [],
    isErrorEmail: false,
    EmailErrorMessage: '',
  }

  componentDidMount() {
    let firstname = localStorage.getItem('firstname')
    firstname = firstname === null ? '' : firstname

    let lastname = localStorage.getItem('lastname')
    lastname = firstname === null ? '' : lastname

    let email = localStorage.getItem('email')
    email = email === null ? '' : email

    let message = localStorage.getItem('message')
    message = message === null ? '' : message

    let add = localStorage.getItem('add')
    add = add === null ? '' : add

    this.setState({
      firstname,
      lastname,
      email,
      message,
      add,
    })
  }

  isStringHasNumber = string => /\d/.test(string)

  onChangeFirstName = event => {
    const error = event.target.value === ''
    localStorage.setItem('firstname', event.target.value)
    const isContainNumber = this.isStringHasNumber(event.target.value)
    if (isContainNumber === true) {
      const error2 = true
      this.setState({
        isErrorFirstname: error2,
        firstNameError: 'name not contain a number',
      })
    } else {
      this.setState({
        firstname: event.target.value,
        isErrorFirstname: error,
        firstNameError: 'Required* ',
      })
    }
  }

  onChangeLastName = event => {
    const error = event.target.value === ''
    localStorage.setItem('lastname', event.target.value)
    const isContainNumber = this.isStringHasNumber(event.target.value)
    if (isContainNumber === true) {
      const error2 = true
      this.setState({
        isErrorLastname: error2,
        lastNameError: 'name not contain a number',
      })
    } else {
      this.setState({
        lastname: event.target.value,
        isErrorLastname: error,
        lastNameError: 'required',
      })
    }
  }

  onChangeemail = event => {
    localStorage.setItem('email', event.target.value)
    if (event.target.value === '') {
      this.setState({
        email: event.target.value,
        isErrorEmail: true,
        EmailErrorMessage: 'Required',
      })
    }
    this.setState({email: event.target.value})
  }

  onChangeMessage = event => {
    localStorage.setItem('message', event.target.value)
    this.setState({message: event.target.value})
  }

  onChangeAdd = event => {
    localStorage.setItem('add', event.target.value)
    this.setState({add: event.target.value})
  }

  onformatData = () => {
    localStorage.clear()
    const {firstname, lastname, email, message, add} = this.state
    const data = {firstname, lastname, email, message, add}
    const {submittedList} = this.state
    const updateData = submittedList.concat(data)

    this.setState({
      isNotSubmitSucces: false,
      submittedList: updateData,
    })
  }

  submitTriggered = event => {
    event.preventDefault()
    const {firstname, lastname, email} = this.state
    console.log(lastname)
    if (firstname === '' && lastname === '') {
      this.setState({
        isErrorFirstname: true,
        isErrorLastname: true,
        firstNameError: 'Required',
        lastNameError: 'Required',
      })
    } else if (firstname === '') {
      this.setState({isErrorFirstname: true, firstNameError: 'Required'})
    } else if (lastname === '') {
      this.setState({isErrorLastname: true, lastNameError: 'Required'})
    } else if (email === '') {
      this.setState({EmailErrorMessage: 'Required', isErrorEmail: true})
    } else {
      this.onformatData()
    }
  }

  renderAnotherForm = () => {
    this.setState({
      isNotSubmitSucces: true,
      firstname: '',
      email: '',
      message: '',
      add: '',
      lastname: '',
    })
  }

  testFirstname = event => {
    const error = event.target.value === ''
    this.setState({isErrorFirstname: error, firstNameError: 'Required'})
  }

  testLastname = event => {
    const error = event.target.value === ''
    this.setState({isErrorLastname: error, lastNameError: 'Required'})
  }

  render() {
    const {
      firstname,
      lastname,
      isErrorFirstname,
      isErrorLastname,
      isNotSubmitSucces,
      firstNameError,
      lastNameError,
      email,
      message,
      add,
      submittedList,
      isErrorEmail,
      EmailErrorMessage,
    } = this.state

    const inFclass = isErrorFirstname ? 'in1 in2' : 'in1'
    const inLclass = isErrorLastname ? 'in1 in2' : 'in1'
    return (
      <div className="bg1">
        <div className="c1">
          <h1 className="h1">Contact Us</h1>
          <form className="c2" onSubmit={this.submitTriggered}>
            {isNotSubmitSucces ? (
              <>
                <label className="p1" htmlFor="firstname">
                  First Name *
                </label>
                <input
                  className={inFclass}
                  placeholder="First name"
                  id="firstname"
                  type="text"
                  value={firstname}
                  onBlur={this.testFirstname}
                  onChange={this.onChangeFirstName}
                />
                {isErrorFirstname && (
                  <p className="error-msg">{firstNameError}*</p>
                )}
                <label htmlFor="lastname" className="p1">
                  Last Name*
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Last name"
                  className={inLclass}
                  value={lastname}
                  onBlur={this.testLastname}
                  onChange={this.onChangeLastName}
                />
                {isErrorLastname && (
                  <p className="error-msg">{lastNameError}*</p>
                )}
                <label htmlFor="email" className="p1">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  className="in1"
                  value={email}
                  onChange={this.onChangeemail}
                />
                {isErrorEmail && <p>{EmailErrorMessage}</p>}

                <label htmlFor="message" className="p1">
                  Message
                </label>
                <input
                  id="message"
                  type="text"
                  placeholder="Message"
                  className="in1"
                  value={message}
                  onChange={this.onChangeMessage}
                />

                <label htmlFor="additional" className="p1">
                  Additional Information
                </label>
                <input
                  id="additional"
                  type="textarea"
                  className="in1"
                  rows={50}
                  cols={5}
                  name="addtional information"
                  value={add}
                  onChange={this.onChangeAdd}
                />
                <button className="b1" type="submit">
                  submit
                </button>
              </>
            ) : (
              <>
                <img
                  className="img1"
                  alt="success"
                  src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
                />
                <p className="p3">Submitted Successfully</p>
                <button
                  className="b1"
                  type="button"
                  onClick={this.renderAnotherForm}
                >
                  Submit another response
                </button>

                <div className="manage-list">
                  <ListHandiling sentdata={submittedList} />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default RegistrationForm
