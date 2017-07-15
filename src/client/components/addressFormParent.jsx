import React, { Component } from 'react'
import { usersUpdateRoute } from '../../server/routes.js'
import AddressFormChild from './addressFormChild.jsx'
import AddressChildList from './addressFormChildList.jsx'

// import { usersUpdateRoute } from '../../shared/routes'
class AddressFormParent extends Component {
	constructor() {
		super()
		this.state = {
			user: {
				__v: 0,
				username: 'stu',
				password:
					'$2a$10$Fw1TNqO02TtziWamXnFZRuC5b9pceEcikywKwSQfyhPtpEjWVREXO',
				_id: '596a4b5cb30d635574119ae8',
				addresses: [{
      "zipcode": "78602",
      "state": "Texas",
      "city": "Austin",
      "address": "4702 Hilldale dr."
    },
    {
      "zipcode": "78602",
      "state": "Texas",
      "city": "Austin",
      "address": "4702 Hilldale dr."
    },
    {
      "zipcode": "78602",
      "state": "Texas",
      "city": "Austin",
      "address": "4702 Hilldale dr."
    }],
			},
			address: {
				address: '',
				city: '',
				state: '',
				zipcode: '',
			}
		}
		this.submitForm = this.submitForm.bind(this)
    this.deleteAddress = this.deleteAddress.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
	}
	// componentDidMount() {
	//   // fetch to the api for the current user data
	// }
	postAddress(address, id) {
		fetch('/api'.concat(usersUpdateRoute(id)), {
			headers: { 'Content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify(address),
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText)
				return res.json()
			})
			.then(data => {
				console.log('data', data)
				if (data) {
					this.setState({ user: data, addresses: data.addresses })
				}
			})
      .then(() => {
        document.getElementById('address').value = ''
        document.getElementById('city').value = ''
        document.getElementById('state').value = ''
        document.getElementById('zipcode').value = ''
      })
			.catch(err => {
				console.log(err)
			})
	}
  getUser(id) {
    fetch('/api'.concat(usersUpdateRoute(id)), {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    })
    .then(res => {
      if(!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then(data => {
      this.setState({ user: data })
    })
  }
	submitForm(e) {
		e.preventDefault()
		// this.state
		// console.log(this.state)
		this.setState(
			{
				address: {
					address: e.target.address.value,
					city: e.target.city.value,
					state: e.target.state.value,
					zipcode: e.target.zipcode.value,
				},
			},
			() => this.postAddress(this.state.address, this.state.user._id),
		)
	}
  deleteAddress(addressId, id) {
    fetch('/api'.concat(usersUpdateRoute(id)), {
      headers: { 'Content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(this.state.user.addresses[addressId]),
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => {
        console.log('data', data)
        if (data) {
          this.setState({ user: data })
        }
      })
      .then(() => {
        document.getElementById('address').value = ''
        document.getElementById('city').value = ''
        document.getElementById('state').value = ''
        document.getElementById('zipcode').value = ''
      })
      .catch(err => {
        console.log(err)
      })
  }

  onClickDelete(e) {
    // e.preventDefault()
    this.deleteAddress(e, this.state.user._id)

  }
	componentDidMount() {
    this.getUser("596a4b5cb30d635574119ae8")
	}
  // router.put(USERS_UPDATE, (req, res, next) => {
  //   const { id } = req.params
  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     res.sendStatus(404)
  //     return
  //   }
  //
  //   User
  //     .findById(id)
  //     .then((user) => {
  //       console.log('user', user)
  //       user.addresses.push(req.body)
  //       return user.save().then((updatedUser) => {
  //         console.log('updatedUser', updatedUser)
  //         res.json(updatedUser)
  //       })
  //     })
  //     .catch(next)
  // })
  //
  // router.put(USERS_UPDATE, (req, res, next) => {
  //   const { id } = req.params
  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     res.sendStatus(404)
  //     return
  //   }
  //
  //   User
  //     .findById(id)
  //     .then((user) => {
  //       user.addresses.splice(req.body, 1)
  //       return user.save().then((updatedUser) => {
  //         // console.log('updatedUser', updatedUser)
  //         res.json(updatedUser)
  //       })
  //     })
  //     .catch(next)
  // })
	render() {
		return (
			<div>
				<h1 onClick={this.submitForm.bind(this)}>Hello World</h1>
				<div>
					<AddressFormChild click={this.submitForm.bind(this)} />
					<AddressChildList onClickDelete={this.onClickDelete} addresses={this.state.user.addresses} />
				</div>
			</div>
		)
	}
}

export default AddressFormParent