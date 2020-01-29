import React, { Component } from "react"
import UsersModel from "../models/UsersModel"
import CreateUserForm from "../components/CreateUserForm"

class CreateUserContainer extends Component {
	state = {
		user:[]
	}

	createUser = (user) => {
		UsersModel.create(user).then((response) => {
			this.setState({
				user: response
			})
		})
	}

	render(){
		return(
			<div className = "createUserContainer">
				<h2>Create a User!</h2>
				<CreateUserForm createUser = {this.createUser} />
			</div>
		)
	}
}

export default CreateUserContainer