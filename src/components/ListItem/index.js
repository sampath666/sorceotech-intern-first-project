import './index.css'

const ListItem = props => {
  const {data} = props
  let {firstname, lastname, add, message, email} = data

  firstname = firstname === '' || firstname === undefined ? 'null' : firstname
  lastname = lastname === '' || lastname === undefined ? 'null' : lastname
  add = add === '' || add === undefined ? 'null' : add
  message = message === '' || message === undefined ? 'null' : message
  email = email === '' || email === undefined ? 'null' : email

  return (
    <div className="item-container">
      <div className="box1">
        <h1 className="heading-item">{firstname}</h1>
      </div>
      <div className="box1">
        <h1 className="heading-item">{lastname}</h1>
      </div>
      <div className="box1">
        <p className="para1">{add}</p>
      </div>
      <div className="box1">
        <p className="para1">{message}</p>
      </div>
      <div className="box1">
        <p className="para1">{email}</p>
      </div>
    </div>
  )
}

export default ListItem
