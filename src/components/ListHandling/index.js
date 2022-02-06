import {Component} from 'react'
import ListItem from '../ListItem'

import './index.css'

class ListHanding extends Component {
  state = {
    finalList: [],
    fullList: [],
    number: 0,
    currnumber: 1,
    rawData: [],
    isSorted: false,
    searchInput: '',
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

      const formatedData = data.slice(0, 6)
      const num =
        data.length % 6 === 0
          ? parseInt(data.length / 6)
          : Math.floor(data.length / 6) + 1
      this.setState({
        finalList: formatedData,
        fullList: data,
        number: num,
        rawData: data,
      })
    }
  }

  onIncrment = () => {
    const {number, currnumber, fullList} = this.state
    if (currnumber < number) {
      const n1 = currnumber * 6
      const n2 = (currnumber + 1) * 6
      const fdata = fullList.slice(n1, n2)
      this.setState({currnumber: currnumber + 1, finalList: fdata})
    }
  }

  onDecrement = () => {
    const {currnumber, fullList} = this.state
    if (currnumber > 1) {
      const n1 = (currnumber - 2) * 6
      const n2 = (currnumber - 1) * 6
      const fdata = fullList.slice(n1, n2)
      this.setState({currnumber: currnumber - 1, finalList: fdata})
    }
  }

  compare = (a, b) => {
    const a1 = a.firstname + a.lastname
    const b1 = b.firstname + b.lastname
    if (a1 < b1) {
      return -1
    }
    if (a1 > b1) {
      return 1
    }
    return 0
  }

  onSortData = () => {
    const {isSorted} = this.state
    if (isSorted === false) {
      const {rawData} = this.state
      const newData = [...rawData]
      newData.sort(this.compare)
      const fdata = newData.slice(0, 6)

      this.setState({
        isSorted: !isSorted,
        fullList: newData,
        finalList: fdata,
        currnumber: 1,
      })
    } else {
      const {rawData} = this.state
      const fdata = rawData.slice(0, 6)
      this.setState({
        isSorted: !isSorted,
        fullList: rawData,
        finalList: fdata,
        currnumber: 1,
      })
    }
  }

  onChangeSearchInput = event => {
    const {isSorted} = this.state
    if (isSorted === false) {
      const {rawData} = this.state
      const newData = [...rawData]
      newData.sort(this.compare)
      const lfData = newData.filter(each => {
        const fullName = each.firstname + each.lastname
        return fullName.toLowerCase().includes(event.target.value.toLowerCase())
      })
      const fdata = lfData.slice(0, 6)

      this.setState({
        isSorted: !isSorted,
        fullList: lfData,
        finalList: fdata,
        searchInput: event.target.value,
      })
    } else {
      const {rawData} = this.state
      const lfData = rawData.filter(each => {
        const fullName = each.firstname + each.lastname
        return fullName.toLowerCase().includes(event.target.value.toLowerCase())
      })
      const fdata = lfData.slice(0, 6)
      this.setState({
        isSorted: !isSorted,
        fullList: lfData,
        finalList: fdata,
        searchInput: event.target.value,
      })
    }
  }

  render() {
    const {finalList, searchInput, currnumber} = this.state

    return (
      <div>
        <h1 className="ps-2">submitted List</h1>
        <div className="sort-names">
          <div className="p1-f">
            <label className="ps-1" htmlFor="sfirstname">
              Sort
            </label>
            <input type="checkbox" onClick={this.onSortData} id="sfirstname" />
          </div>
          <div>
            <label className="p1 ps-1" htmlFor="clastname">
              Search
            </label>
            <input
              className="ins1"
              placeholder="Enter Text to search"
              id="clastname"
              type="text"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <div className="navigate">
          <button
            type="button"
            className="button-navi"
            onClick={this.onDecrement}
          >
            {'<-'}
          </button>
          <p className="center">{currnumber}</p>
          <button
            type="button"
            className="button-navi"
            onClick={this.onIncrment}
          >
            {'->'}
          </button>
        </div>

        <div className="item-container1">
          <div className="box1">
            <h1 className="heading-item2">firstname</h1>
          </div>
          <div className="box1">
            <h1 className="heading-item2">lastname</h1>
          </div>
          <div className="box1">
            <h1 className="heading-item2">add</h1>
          </div>
          <div className="box1">
            <h1 className="heading-item2">message</h1>
          </div>
          <div className="box1">
            <h1 className="heading-item2">email</h1>
          </div>
        </div>

        <div className="submitlist-container">
          {finalList.map(each => (
            <ListItem data={each} key={each.firstname} />
          ))}
        </div>
      </div>
    )
  }
}

export default ListHanding
