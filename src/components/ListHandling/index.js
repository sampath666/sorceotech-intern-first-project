import {Component} from 'react'

import MaterialTable from 'material-table'

import './index.css'

class ListHanding extends Component {
  state = {
    rawData: [],
  }

  componentDidMount() {
    this.getDataFetch()
  }

  getDataFetch = async () => {
    const apiUrl = 'https://task-web-app-demo.herokuapp.com/forms/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const {sentdata} = this.props

      const redata = await response.json()
      const data = redata.concat(sentdata)

      const changeFormat = each => {
        const a = {
          firstname: each.firstname,
          lastname: each.lastname,
          email: each.email,
          mess: each.message,
          add: each.addtional,
        }
        return a
      }

      const formatData = data.map(each => changeFormat(each))

      this.setState({
        rawData: formatData,
      })
    }
  }

  render() {
    const {rawData} = this.state

    console.log(rawData)
    const columns = [
      {title: 'FirstName', field: 'firstname'},
      {title: 'LastName', field: 'lastname'},
      {title: 'email', field: 'email'},
      {title: 'message', field: 'mess', emptyValue: () => <em>null</em>},
      {title: 'additional', field: 'add'},
    ]

    return (
      <div>
        <MaterialTable
          columns={columns}
          data={rawData}
          title="contact us List"
        />
      </div>
    )
  }
}

export default ListHanding
